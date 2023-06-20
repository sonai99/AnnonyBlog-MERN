const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// ---------------------------------------- |
// @description     Get All Users           |
// @route           GET /getUsers           |
// @access          Public                  |
// ---------------------------------------- |

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ---------------------------------------- |
// @description     Get Users by Id         |
// @route           GET /getUsers/:id       |
// @access          Public                  |
// ---------------------------------------- |

const getUsersById = async (req, res) => {
  const searchid = req.params.id;
  const users = await User.findById(searchid);
  res.send(users);
};

// ---------------------------------------- |
// @description     Create New User         |
// @route           POST /createUser        |
// @access          Public                  |
// ---------------------------------------- |

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all the Fields Properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already Exists" });
    } else {
      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

// ---------------------------------------- |
// @description     User Login              |
// @route           POST /login             |
// @access          Public                  |
// ---------------------------------------- |

const login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
};

module.exports = {
  getUsers,
  getUsersById,
  login,
  createUser,
};
