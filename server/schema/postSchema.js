const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    summary : String,
    content : String,
    blog : String,
    cover:String,
    likeCount: {
      type: Number,
      default: 0,
  },
    author:{
      type:Schema.Types.ObjectId, 
      ref:'User'
    },
    comments:[{ 
      type: Schema.Types.ObjectId, 
      ref: 'Comment' 
    }]
  }, 
  { timestamps: true});
  
  const Post = mongoose.model("Post", postSchema);
  module.exports = Post;
