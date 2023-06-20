const Comment = require("../schema/commentSchema");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Post = require("../schema/postSchema.js");
// ---------------------------------------- |
// @description     Post a New Comment      |
// @route           POST /post/:id/comment  |
// @access          Public                  |
// ---------------------------------------- |

const postComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await Comment.create({ comment, post: post._id });
    post.comments.push(newComment._id);
    await post.save();

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------------------- |
// @description     Get Comments            |
// @route           GET /post/:id/comment   |
// @access          Public                  |
// ---------------------------------------- |

const getComment = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate("comments");
  if (post) {
    const comments = post.comments;
    return res.status(200).json(comments);
  }
};

module.exports = {
  postComment,
  getComment,
};
