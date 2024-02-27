const router = require("express").Router();
let uploadCtrl = require("../controllers/uploadCtrl");

router.post("/upload-image", uploadCtrl.uploadImage);
router.post("/delete-image", uploadCtrl.deleteImage);

module.exports = router;
