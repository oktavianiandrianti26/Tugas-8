const express = require("express");
const borrowerController = require("../controllers/borrower_controller");

const borrowerRoutes = express.Router();

borrowerRoutes.post("/borrower", borrowerController.insert);

borrowerRoutes.get("/borrower", borrowerController.getAll);

borrowerRoutes.delete("/borrower/:id", borrowerController.delete);

borrowerRoutes.put("/borrower/:id", borrowerController.update);

borrowerRoutes.get("/borrower/:id", (req,res) => {
    res.send("Not Implemented");
});

module.exports = borrowerRoutes;