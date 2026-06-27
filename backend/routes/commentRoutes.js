const express = require("express");

const router = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");


// Add Comment
router.post("/:blogId", protect, addComment);

// Get Comments
router.get("/:blogId", getComments);

// Delete Comment
router.delete("/delete/:id", protect, deleteComment);

module.exports = router;