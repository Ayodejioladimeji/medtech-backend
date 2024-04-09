const Media = require("../models/mediaModel");

// 

const MediaCtrl = {
  createMedia: async (req: any, res: any) => {
    try {
      const { title, content, author, image } = req.body;
      // check for empty values
      if (title === "" || content === "" || author === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      } else if (image === "") {
        return res.status(400).json({ msg: "Upload image to continue" });
      }

      // save data in the database
      const media = new Media({
        author,
        title,
        content,
        image: image,
      });

      await media.save();

      res.json({ msg: "Created succcessfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  // get all medias
  getAllMedia: async (req, res) => {
    try {
      const medias = await Media.find()
      if (!medias) return res.status(400).json({ msg: "Data does not exist" });

      res.json(medias);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // get single media
  getMedia: async (req, res) => {
    try {
      const media = await Media.findOne({ _id: req.params.id });
      if (!media) return res.status(400).json({ msg: "Media does not exist" });

      res.json(media);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update media
  updateMedia: async (req, res) => {
    try {
      const { id, title, content, author, image } = req.body;

      // check for empty values
      if (title === "" || content === "" || author === "") {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      } else if (image === "") {
        return res.status(400).json({ msg: "Upload image to continue" });
      }

      await Media.findOneAndUpdate(
        { _id: id },
        {
          author,
          title,
          content,
          image: image,
        }
      );

      res.json({ msg: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // delete media
  deleteMedia: async (req, res) => {
    try {
      await Media.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //
};

module.exports = MediaCtrl;
