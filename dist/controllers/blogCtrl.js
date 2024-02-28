var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Blog = require("../models/blogModel");
const blogCtrl = {
    createBlog: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, title, content, image } = req.body;
            // check for empty values
            if (category === "" || title === "" || content === "") {
                return res.status(400).json({ msg: "Inputs cannot be empty" });
            }
            else if (image === "") {
                return res.status(400).json({ msg: "Upload image to continue" });
            }
            // save data in the database
            const blog = new Blog({
                category,
                title,
                content,
                image: image,
            });
            yield blog.save();
            res.json({ msg: "Blog created succcessfully" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    // get all blogs
    getAllblog: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const blogs = yield Blog.find();
            if (!blogs)
                return res.status(400).json({ msg: "Data does not exist" });
            res.json(blogs);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // get single blog
    getBlog: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const blog = yield Blog.findOne({ _id: req.params.id });
            if (!blog)
                return res.status(400).json({ msg: "Blog does not exist" });
            res.json(blog);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // update blog
    updateBlog: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, category, title, content, image } = req.body;
            // check for empty values
            if (category === "" || title === "" || content === "") {
                return res.status(400).json({ msg: "Inputs cannot be empty" });
            }
            else if (image === "") {
                return res.status(400).json({ msg: "Upload image to continue" });
            }
            yield Blog.findOneAndUpdate({ _id: id }, {
                category,
                title,
                content,
                image: image,
            });
            res.json({ msg: "Blog updated successfully" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // delete blog
    deleteBlog: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Blog.findByIdAndDelete(req.params.id);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //
};
module.exports = blogCtrl;
