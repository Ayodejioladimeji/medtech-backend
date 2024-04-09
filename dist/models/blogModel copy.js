let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: "",
    },
    image: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Blog", blogSchema);
