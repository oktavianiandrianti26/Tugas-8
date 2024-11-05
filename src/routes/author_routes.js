const express = require("express");
const authorController = require("../controllers/author_controller");

const authorRoutes = express.Router();

authorRoutes.post("/author", authorController.insert);

authorRoutes.get("/author", authorController.getAll);

authorRoutes.post("/author/upload", authorController.upload);

authorRoutes.delete("/author/:id", authorController.delete);

authorRoutes.put("/author/:id", authorController.update);

authorRoutes.get("/author/:id", (req,res) => {
    res.send("Not Implemented");
});

module.exports = authorRoutes;