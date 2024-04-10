var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Media = require("../models/mediaModel");
// 
const MediaCtrl = {
    createMedia: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, url, content, author, image } = req.body;
            // check for empty values
            if (title === "" || url === "" || content === "" || author === "") {
                return res.status(400).json({ msg: "Inputs cannot be empty" });
            }
            else if (image === "") {
                return res.status(400).json({ msg: "Upload image to continue" });
            }
            // save data in the database
            const medias = new Media({
                author,
                url,
                title,
                content,
                image: image,
            });
            yield medias.save();
            res.json({ msg: "Created succcessfully" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    // get all medias
    getAllMedia: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const medias = yield Media.find();
            if (!medias)
                return res.status(400).json({ msg: "Data does not exist" });
            res.json(medias);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // get single media
    getMedia: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const media = yield Media.findOne({ _id: req.params.id });
            if (!media)
                return res.status(400).json({ msg: "Media does not exist" });
            res.json(media);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // update media
    updateMedia: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, title, content, author, image } = req.body;
            // check for empty values
            if (title === "" || content === "" || author === "") {
                return res.status(400).json({ msg: "Inputs cannot be empty" });
            }
            else if (image === "") {
                return res.status(400).json({ msg: "Upload image to continue" });
            }
            yield Media.findOneAndUpdate({ _id: id }, {
                author,
                title,
                content,
                image: image,
            });
            res.json({ msg: "Updated successfully" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    // delete media
    deleteMedia: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Media.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //
};
module.exports = MediaCtrl;
