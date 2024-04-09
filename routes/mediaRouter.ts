const Router = require("express").Router();
let mediaCtrl = require("../controllers/mediaCtrl");

Router.post("/media", mediaCtrl?.createMedia);

Router.get("/all-media", mediaCtrl?.getAllMedia);

Router.get("/media/:id", mediaCtrl?.getMedia);

Router.patch("/media", mediaCtrl?.updateMedia);

Router.delete("/delete-media/:id", mediaCtrl?.deleteMedia);

module.exports = Router;
