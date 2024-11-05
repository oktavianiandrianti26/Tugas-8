const express = require("express");
const bookController = require("../controllers/book_controller");

const bookRoutes = express.Router();

bookRoutes.post("/book", bookController.insert);

bookRoutes.get("/book", bookController.getAll);

bookRoutes.post("/book/upload", bookController.upload);

bookRoutes.delete("/book/:id", bookController.delete);

bookRoutes.put("/book/:id", bookController.update);

bookRoutes.get("/book/:id", (req,res) => {
    res.send("Not Implemented");
});

module.exports = bookRoutes;