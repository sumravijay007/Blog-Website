const Comment = require("../models/Comment");
const Blog = require("../models/Blog");


// ================= ADD COMMENT =================
const addComment = async (req, res) => {

  try {

    const { text } = req.body;

    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const comment = await Comment.create({
      text,
      user: req.user._id,
      blog: req.params.blogId,
    });

    res.status(201).json(comment);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= GET COMMENTS =================
const getComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      blog: req.params.blogId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// ================= DELETE COMMENT =================
const deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {

      return res.status(404).json({
        message: "Comment not found",
      });

    }

    if (comment.user.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully",
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};