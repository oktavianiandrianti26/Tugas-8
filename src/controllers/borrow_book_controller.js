const BorrowedBookModel = require("../models/borrow_book_model");
const BookModel = require("../models/book_model");
const { responseJson } = require("../utils/http");

const borrowBookController = {};

// Tambah data peminjaman buku
borrowBookController.borrowBook = async (req, res, next) => {
    try {
        const { bookId, borrowerId, expectedReturnAt } = req.body;

        // Validasi input
        if (!bookId || !borrowerId || !expectedReturnAt) {
            throw new Error("bad_request");
        }

        // Cek jika buku ada dan belum dihapus
        const book = await BookModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) {
            return responseJson(res, null, "Book not found", 404);
        }

        // Tambah data peminjaman
        const borrowedBook = new BorrowedBookModel({
            book: bookId,
            borrower: borrowerId,
            expectedReturnAt,
        });
        const result = await borrowedBook.save();

        responseJson(res, { borrowedBook: result }, "Book borrowed successfully", 201);
    } catch (error) {
        next(error);
    }
};

// Mendapatkan list data peminjam buku yang masih aktif
borrowBookController.getActiveBorrowedBooks = async (req, res, next) => {
    try {
        const result = await BorrowedBookModel.find({
            isDeleted: false,
            returnedAt: null,
        }).populate("book borrower");  // Mengambil detail buku dan peminjam

        if (!result.length) {
            return responseJson(res, null, "No active borrowed books found", 404);
        }

        responseJson(res, result, "Active borrowed books retrieved", 200);
    } catch (error) {
        next(error);
    }
};

// Menambahkan data pengembalian buku
borrowBookController.returnBook = async (req, res, next) => {
    try {
        const { bookId, borrowerId } = req.body;

        if (!bookId || !borrowerId) {
            throw new Error("bad_request");
        }

        // Cari data peminjaman yang belum dikembalikan
        const borrowedBook = await BorrowedBookModel.findOne({
            book: bookId,
            borrower: borrowerId,
            returnedAt: null,
            isDeleted: false,
        });

        if (!borrowedBook) {
            return responseJson(res, null, "Borrowed book not found", 404);
        }

        // Perbarui tanggal pengembalian
        borrowedBook.returnedAt = new Date();
        const result = await borrowedBook.save();

        responseJson(res, { borrowedBook: result }, "Book returned successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = borrowBookController;
