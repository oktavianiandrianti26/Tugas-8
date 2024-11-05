const BookModel = require("../models/book_model");
const { responseJson } = require("../utils/http");

const bookController = {};

bookController.insert = async (req, res, next) => {
    try {
        const { 
            title, 
            totalStocks = 0 , 
            authorId, 
            categoryIds =  []
         } = req.body;
       
         if (!title || !authorId || !Array.isArray(categoryIds)) {
            const error = new Error("Invalid input data");
            error.name = "bad_request";
            throw error;
        }

        const doc = await BookModel.create({
            title,
            totalStocks,
            author: authorId,
            categories: categoryIds,
        });

        responseJson(res, { book: doc}, "created, 201");

    } catch (error) {
        if (error.code === 11000) {
            return responseJson(res, null, "Duplicate entry", 409);
        }
        next(error);
    }
};

bookController.getAll = async (req, res, next) => {
    try {
        const result = await BookModel.find({ isDeleted: false })
        .populate("author")
        .populate("categories");
        if (!result.length) {
            return responseJson(res, null, "No books found", 404);
        }
        responseJson(res, result, "Books retrieved", 200);
    } catch (error) {
        next(error);
    }
};

bookController.upload = async (req, res, next) => {
    try {
        const { imageUrl, id } = req.body;
        if (!imageUrl || !id) {
            throw new Error("bad_request");
        }
        const result = await BookModel.findByIdAndUpdate(
            id,
            { imageUrl },
            { new: true }
        );
        if (!result) {
            throw  { name: "not_found" };
        }
        responseJson(res, { book: result }, "Image updated successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.update = async (req, res, next) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        if (!title || !id) {
            throw new Error("bad_request");
        }
        const result = await BookModel.findByIdAndUpdate(
            id,
            { title },
            { new: true, runValidators: true }
        );
        if (!result) {
            throw { name: "not_found" };
        }
        responseJson(res, { book: result }, "Title updated successfully", 200);
    } catch (error) {
        next(error);
    }
};

bookController.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("bad_request");
        }
        const result = await BookModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (!result) {
            throw { name: "not_found" };
        }
        responseJson(res, { book: result }, "Book deleted successfully", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = bookController;
