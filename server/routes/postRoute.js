const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createPost,
  getPosts,
  getPostById,
  likePost,
} = require("../controllers/postController");
const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/createPost", uploadMiddleware.single("file"), createPost);
router.get("/post", getPosts);
router.get("/post/:id", getPostById);
router.patch("/post/:id/likePost", likePost);

module.exports = router;
