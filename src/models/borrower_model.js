const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    updateAt: {
        type: Date,
        default: new Date(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

borrowerSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
        return ret;
    },
});

const BorrowerModel = mongoose.model("borrower", borrowerSchema);

module.exports = BorrowerModel;