const express = require("express");
const categoryController = require("../controllers/category_controller");

const categoryRoutes = express.Router();

categoryRoutes.post("/category", categoryController.insert);

categoryRoutes.get("/category", categoryController.getAll);

categoryRoutes.delete("/category/:id", categoryController.delete);

categoryRoutes.put("/category/:id", categoryController.update);

categoryRoutes.get("/category/:id", (req,res) => {
    res.send("Not Implemented");
});

module.exports = categoryRoutes;