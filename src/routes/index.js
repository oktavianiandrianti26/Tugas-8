const express = require("express");
const testRoutes = require("./test_routes");
const bookRoutes = require("./book_routes");
const authorRoutes = require("./author_routes");
const categoryRoutes = require("./category_routes");
const borrowerRoutes = require("./borrower_routes");
const borrowBookRoutes = require("./borrow_book_routes");  // Import route peminjaman buku



const routes = express.Router();

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(testRoutes);
routes.use(bookRoutes);
routes.use(authorRoutes);
routes.use(categoryRoutes);
routes.use(borrowerRoutes);
routes.use(borrowBookRoutes);


module.exports = routes;