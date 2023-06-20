const Post = require("../schema/postSchema");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

// ---------------------------------------- |
// @description     Create New Post         |
// @route           Post /createPost        |
// @access          Public                  |
// ---------------------------------------- |

const createPost = async (req,res)=>{
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {summary, content, blog} = req.body;
      const postDoc = await Post.create({
        summary,
        content,
        cover:newPath,
        blog,
      });
    res.json(postDoc);
  };

// ---------------------------------------- |
// @description     Get All Posts           |
// @route           GET /post               |
// @access          Public                  |
// ---------------------------------------- |

const getPosts = async (req, res) => {
    const options = { bufferTimeMS: 30000 }; // increase the timeout to 30 seconds
    res.json(await Post.find({}, null, options).populate('author', ['username']));
  };

// ---------------------------------------- |
// @description     Get Posts by ID         |
// @route           GET /post/:id           |
// @access          Public                  |
// ---------------------------------------- |

const getPostById = async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  };

// ---------------------------------------- |
// @description     Like a Post             |
// @route           PATCH /post/:id/likePost|
// @access          Public                  |
// ---------------------------------------- |

const likePost = async (req,res)=>{
    const {id} = req.params;
    try {
      const blogPost = await Post.findById(id)
      if(!blogPost){
        return res.json(`No post found with id ${id}`)
      }
  
      blogPost.likeCount += 1;
      await blogPost.save();
      res.json(blogPost)
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  createPost,
  getPosts, 
  getPostById,
  likePost
};