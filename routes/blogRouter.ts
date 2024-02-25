const router = require("express").Router();
let blogCtrl = require("../controllers/blogCtrl");

router.post("/blog", blogCtrl.createBlog);

router.get("/all-blog", blogCtrl.getAllblog);

router.get("/blog/:id", blogCtrl.getBlog);

router.patch("/blog", blogCtrl.updateBlog);

router.delete("/blog", blogCtrl.deleteBlog);

module.exports = router;
