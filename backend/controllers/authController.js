const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};



// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    // Check all fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Response
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });

  }
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ================= LOGIN =================
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check user & password
    if (user && (await bcrypt.compare(password, user.password))) {

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid email or password",
      });

    }

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const fetchSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)
      return res.json({ message: "Pls send id" })

    const dbUser = await User.findById(id)
    if (!dbUser) {
      return res.status(404).json({ message: `User with id ${id} not found ` })
    }

    res.status(200).json({ message: "User found", dbUser })
  } catch (error) {
    console.log("Error fetching single user")
    res.status(500).json({
      message: error.message,
    });

  }
}

module.exports = {
  registerUser,
  loginUser,
  fetchSingleUser
};