const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUsersById,
  createUser,
  login,
} = require("../controllers/userController");

router.get("/getUsers", getUsers);
router.get("/getUsers/:id", getUsersById);
router.post("/createUser", createUser);
router.post("/login", login);

module.exports = router;
