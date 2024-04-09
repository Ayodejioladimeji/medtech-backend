var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const UploadCtrl = {
    uploadImage: (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.files;
            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            //   validate images
            if ((file === null || file === void 0 ? void 0 : file.size) > 1024 * 1024) {
                removeTmp(file === null || file === void 0 ? void 0 : file.tempFilePath);
                return res.status(400).json({ msg: "Size too large" });
            }
            if ((file === null || file === void 0 ? void 0 : file.mimetype) !== "image/jpeg" && (file === null || file === void 0 ? void 0 : file.mimetype) !== "image/png") {
                removeTmp(file === null || file === void 0 ? void 0 : file.tempFilePath);
                return res.status(400).json({ msg: "File format is incorrect." });
            }
            //    Save image
            cloudinary.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.tempFilePath, {
                folder: "avatar",
                //   width: 150,
                //   height: 150,
                crop: "fill",
            }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                removeTmp(file.tempFilePath);
                const data = {
                    public_id: result.public_id,
                    format: result.format,
                    url: result.secure_url,
                    filename: result.original_filename,
                };
                res.json(data);
            }));
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    // Delete images
    deleteImage: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { public_id } = req.body;
        if (!public_id)
            return res.status(400).json({ msg: "No image selected" });
        yield cloudinary.uploader.destroy(public_id);
        res.json({ msg: "Image Deleted" });
    }),
};
//
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err)
            throw err;
    });
};
module.exports = UploadCtrl;
