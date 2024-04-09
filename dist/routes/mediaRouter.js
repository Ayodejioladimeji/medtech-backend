const Router = require("express").Router();
let mediaCtrl = require("../controllers/mediaCtrl");
Router.post("/media", mediaCtrl === null || mediaCtrl === void 0 ? void 0 : mediaCtrl.createMedia);
Router.get("/all-media", mediaCtrl === null || mediaCtrl === void 0 ? void 0 : mediaCtrl.getAllMedia);
Router.get("/media/:id", mediaCtrl === null || mediaCtrl === void 0 ? void 0 : mediaCtrl.getMedia);
Router.patch("/media", mediaCtrl === null || mediaCtrl === void 0 ? void 0 : mediaCtrl.updateMedia);
Router.delete("/delete-media/:id", mediaCtrl === null || mediaCtrl === void 0 ? void 0 : mediaCtrl.deleteMedia);
module.exports = Router;
