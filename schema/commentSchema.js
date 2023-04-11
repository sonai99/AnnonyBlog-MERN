const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    comment: String,
  }, {
    timestamps: true,
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
  });
  
  const Comment = mongoose.model("Comment", commentSchema);
  module.exports = Comment;
