let mongoose = require("mongoose");
const mediaSchema = new mongoose.Schema({
    author: {
        type: String,
        default: true,
    },
    url: {
        type: String,
        default: true,
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
module.exports = mongoose.model("Media", mediaSchema);
