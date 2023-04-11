const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const router = express.Router();
require('dotenv').config();
const cors = require("cors");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {Schema,model} = mongoose;
const port = process.env.PORT;
const DB = process.env.MONGO_URL;
const secret = process.env.JWT_SECRET;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
require('./db/connection.js')

const User = require('./schema/userSchema.js')
const Post = require('./schema/postSchema.js')
const Comment = require('./schema/commentSchema.js')


// ### - Create new Mongoose Schema - ###

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// },
// { timestamps: true });

// const User = mongoose.model("User", userSchema);


// const postSchema = new mongoose.Schema({
//   summary : String,
//   content : String,
//   blog : String,
//   likeCount: {
//     type: Number,
//     default: 0,
// },
//   author:{type:Schema.Types.ObjectId, ref:'User'},
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
// }, { timestamps: true});

// const Post = mongoose.model("Post", postSchema);

// const commentSchema = new mongoose.Schema({
//   comment: String,
// }, {
//   timestamps: true,
//   post: { type: Schema.Types.ObjectId, ref: 'Post' }
// });

// const Comment = mongoose.model("Comment", commentSchema);



app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



app.get('/getUsers/:id', async (req,res)=>{
  const searchid = req.params.id;
  const users = await User.findById(searchid);
  res.send(users);
});



app.put('/updateUsers/:id', async (req,res)=>{

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id, // ID of the user to update
    req.body, // Data to update
    { new: true } // Return the updated document
  );
  res.json(updatedUser)
})

const salt = bcrypt.genSaltSync(10);

// // ### - Create User posts new user in DB - ###

app.post("/createUser", async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password){
    return res.status(422).json({error:"Please fill all the Fields Properly"});
}
  try {
      const userExist = await User.findOne({ email : email});
      if(userExist){
        return res.status(422).json({error:"User already Exists"});
      }
      else{    
        // const user = new User({ username, email, password });
        // await user.save();
        const user = await User.create({username, email, password:bcrypt.hashSync(password,salt)});
        res.status(201).json({ message: "User created successfully" });
      }
  }catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
});


// ### - Create posts in DB using postSchema - ###

app.post('/createPost', async (req,res)=>{
  const {summary, content, blog} = req.body;
    const postDoc = await Post.create({
      summary,
      content,
      blog,
    });
  res.json(postDoc);
})




app.post('/post/:id/comment', async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({ comment, post: post._id });
    post.comments.push(newComment._id);
    await post.save();

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/post/:id/comment', async (req,res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate('comments');
  if(post) {
    const comments = post.comments;
    return res.status(200).json(comments)
  }
})





// // ### - Login - ###
  
app.post('/login', async (req,res)=>{
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
})

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

// // ### - Delete User posts new user in DB - ###
app.delete('/updateUsers/:id', async (req,res)=>{
  const deletedUser = await User.deleteOne({_id: req.params.id})
  res.json(deletedUser)
})



app.get('/post', async (req, res) => {
  const options = { bufferTimeMS: 30000 }; // increase the timeout to 30 seconds
  res.json(await Post.find({}, null, options).populate('author', ['username']));
});


app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.patch('/post/:id/likePost', async (req,res)=>{
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
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });