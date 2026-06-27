const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  fetchSingleUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");


// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// Protected Route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
router.get('/user/:id', fetchSingleUser)

module.exports = router;