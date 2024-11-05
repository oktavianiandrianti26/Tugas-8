const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    title : {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    totalStocks : {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose. Types. ObjectId,
        required: true,
        ref: "author",
    },
    categories: [
        {
            type: mongoose. Types. ObjectId,
            ref: "category",
        }
    ],

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

bookSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
        return ret;
    },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;