const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");



// ================= CREATE BLOG =================
const createBlog = async (req, res) => {

  try {

    const { title, content, category, tags } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      category,
      tags,
      author: req.user._id,
    });

    res.status(201).json(blog);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= GET ALL BLOGS =================
const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= GET SINGLE BLOG =================
const getSingleBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id)
      .populate("author", "username email");

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });

    }

    res.status(200).json(blog);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= UPDATE BLOG =================
const updateBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });

    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBlog);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= DELETE BLOG =================
const deleteBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });

    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ================= LIKE / UNLIKE BLOG =================
const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    console.log(blog)

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user already liked
    const likedIndex = blog.likes.indexOf(req.user._id);

    if (likedIndex === -1) {
      // Not liked → Add user
      blog.likes.push(req.user._id);
    } else {
      // Already liked → Remove user
      blog.likes.splice(likedIndex, 1);
    }

    await blog.save();

    // Populate likes with username
    const updatedBlog = await Blog.findById(req.params.id).populate(
      "likes",
      "username"
    );
    console.log(updatedBlog)
    res.status(200).json(updatedBlog);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CREATE BLOG WITH IMAGE =================
const createBlogWithImage = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mern-blog" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const blog = await Blog.create({
      title,
      content,
      category,
      tags,
      author: req.user._id,
      image: imageUrl,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    blog.comments.push(comment);
    await blog.save();

    // Populate comments with username
    const updatedBlog = await Blog.findById(req.params.id)
      .populate("comments.user", "username");

    res.status(200).json(updatedBlog.comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment (optional)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    comment.remove();
    await blog.save();

    res.status(200).json({ message: "Comment deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get My Blogs
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog, createBlogWithImage, addComment, deleteComment, getMyBlogs
};