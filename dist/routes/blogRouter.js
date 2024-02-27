const router = require("express").Router();
let blogCtrl = require("../controllers/blogCtrl");
router.post("/blog", blogCtrl === null || blogCtrl === void 0 ? void 0 : blogCtrl.createBlog);
router.get("/all-blog", blogCtrl === null || blogCtrl === void 0 ? void 0 : blogCtrl.getAllblog);
router.get("/blog/:id", blogCtrl === null || blogCtrl === void 0 ? void 0 : blogCtrl.getBlog);
router.patch("/blog", blogCtrl === null || blogCtrl === void 0 ? void 0 : blogCtrl.updateBlog);
router.delete("/blog", blogCtrl === null || blogCtrl === void 0 ? void 0 : blogCtrl.deleteBlog);
module.exports = router;
