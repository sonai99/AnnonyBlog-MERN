const express = require("express");
const router = express.Router();
const { postComment, getComment } = require("../controllers/commentController");

router.post("/post/:id/comment", postComment);
router.get("/post/:id/comment", getComment);

module.exports = router;
