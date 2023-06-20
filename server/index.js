const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const router = express.Router();
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Schema, model } = mongoose;
const port = process.env.PORT;
const DB = process.env.MONGO_URL;
const secret = process.env.JWT_SECRET;
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const commentRoute = require("./routes/commentRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
require("./db/connection.js");

const User = require("./schema/userSchema.js");
const Post = require("./schema/postSchema.js");
const Comment = require("./schema/commentSchema.js");

app.use("/", postRoute);
app.use("/", userRoute);
app.use("/", commentRoute);

const salt = bcrypt.genSaltSync(10);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
