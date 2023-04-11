require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.MONGO_URL;

mongoose.connect(
    DB
), { useNewUrlParser: true };
console.log(mongoose.connection.readyState);