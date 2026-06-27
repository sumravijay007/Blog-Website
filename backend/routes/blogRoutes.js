const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog, likeBlog, createBlogWithImage, addComment, deleteComment
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

const { getMyBlogs } = require("../controllers/blogController");


// Create Blog
// router.post("/", protect, createBlog);

// Get All Blogs
router.get("/", getBlogs);
router.get("/myblogs", protect, getMyBlogs);
// Get Single Blog
router.get("/:id", getSingleBlog);

// Update Blog
router.put("/:id", protect, updateBlog);

// Delete Blog
router.delete("/:id", protect, deleteBlog);

// Like / Unlike Blog
router.put("/like/:id", protect, likeBlog);

// Update route for image upload
router.post("/", protect, upload.single("image"), createBlogWithImage);

router.post("/comment/:id", protect, addComment);
router.delete("/comment/:id/:commentId", protect, deleteComment);

// My Blogs Route



module.exports = router;