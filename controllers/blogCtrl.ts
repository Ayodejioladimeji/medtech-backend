const Blog = require("../models/blogModel");
// import Blog  from "../models/blogModel";

const BlogCtrl = {
  createBlog: async (req: any, res: any) => {
    try {
      const { category, title, content, image } = req.body;
      // check for empty values
      if (category === "" || title === "" || content === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      } else if (image === "") {
        return res.status(400).json({ msg: "Upload image to continue" });
      }

      // save data in the database
      const blog = new Blog({
        category,
        title,
        content,
        image: image,
      });

      await blog.save();

      res.json({ msg: "Blog created succcessfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  // get all blogs
  getAllblog: async (req, res) => {
    try {
      const blogs = await Blog.find().sort("-createdAt");;
      if (!blogs) return res.status(400).json({ msg: "Data does not exist" });

      res.json(blogs);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // get single blog
  getBlog: async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      if (!blog) return res.status(400).json({ msg: "Blog does not exist" });

      res.json(blog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update blog
  updateBlog: async (req, res) => {
    try {
      const { id, category, title, content, image } = req.body;

      // check for empty values
      if (category === "" || title === "" || content === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      } else if (image === "") {
        return res.status(400).json({ msg: "Upload image to continue" });
      }

      await Blog.findOneAndUpdate(
        { _id: id },
        {
          category,
          title,
          content,
          image: image,
        }
      );

      res.json({ msg: "Blog updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // delete blog
  deleteBlog: async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ msg: "Blog deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //
};

module.exports = BlogCtrl;
