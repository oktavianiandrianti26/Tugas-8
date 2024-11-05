const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "book",
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "borrower",
    },
    borrowedAt: {
        type: Date,
        default: Date.now,
    },
    expectedReturnAt: {
        type: Date,
        required: true,
    },
    returnedAt: {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: { createdAt: "createAt", updatedAt: "updateAt" }
});

borrowedBookSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

const BorrowedBookModel = mongoose.model("borrowedbook", borrowedBookSchema);

module.exports = BorrowedBookModel;
