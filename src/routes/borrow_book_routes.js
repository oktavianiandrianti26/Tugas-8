const express = require("express");
const borrowBookController = require("../controllers/borrow_book_controller");

const borrowBookRoutes = express.Router();

// Endpoint untuk menambahkan data peminjam buku
borrowBookRoutes.post("/borrow/book", borrowBookController.borrowBook);

// Endpoint untuk mendapatkan list data peminjam buku yang masih aktif
borrowBookRoutes.get("/borrow/book/list", borrowBookController.getActiveBorrowedBooks);

// Endpoint untuk menambahkan data pengembalian buku
borrowBookRoutes.post("/borrow/book/return", borrowBookController.returnBook);

module.exports = borrowBookRoutes;
