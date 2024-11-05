const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
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

authorSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
        return ret;
    },
});

const AuthorModel = mongoose.model("author", authorSchema);

module.exports = AuthorModel;