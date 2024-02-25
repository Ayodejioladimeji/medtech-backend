const Blog = require("../models/blogModel");

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const { category, title, content } = req.body;
      // check for empty values
      if (category === "" || title === "" || content === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      }

      // save data in the database
      const blog = new Blog({
        category,
        title,
        content,
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
      const blogs = await Blog.find();
      if (!blogs) return res.status(400).json({ msg: "Data does not exist" });

      res.json(blogs);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // get single blog
  getBlog: async (req, res) => {
    try {
      const blog = await Blog.find({ _id: req.params.id });
      if (!blog) return res.status(400).json({ msg: "Blog does not exist" });

      res.json(blog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update blog
  updateBlog: async (req, res) => {
    try {
      const { id, category, title, content } = req.body;

      // check for empty values
      if (category === "" || title === "" || content === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      }

      await Blog.findOneAndUpdate(
        { _id: id },
        {
          category,
          title,
          content,
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
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //
};

module.exports = blogCtrl;
