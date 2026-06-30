import { Link } from "react-router-dom";
import API from "../services/api";
import { useState, useEffect } from "react";
import "./BlogCard.css";

function BlogCard({ blog, refreshBlogs }) {
  const [likes, setLikes] = useState(blog.likes.length);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = localStorage.user;

  useEffect(() => {
    setLikes(blog.likes.length);
  }, [blog]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like");
      return;
    }

    setLoading(true);
    try {
      const res = await API.put(`/blogs/like/${blog._id}`);
      const updatedLikes = res.data.likes.length;
      setLikes(updatedLikes);
      setLiked((prev) => !prev);

      if (refreshBlogs) {
        await refreshBlogs();
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("Failed to like/unlike blog");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = blog.content.split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    
    <article className="blog-card">
      {blog.image && (
        <div className="blog-card__image-wrap">
          <img
            className="blog-card__image"
            src={blog.image}
            alt={blog.title}
          />
          <div className="blog-card__image-overlay" />
        </div>
      )}

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__author-badge">
            <span className="blog-card__avatar">
              {blog.author.username.charAt(0).toUpperCase()}
            </span>
            {blog.author.username}
          </span>
          <span className="blog-card__read-time">{readTime} min read</span>
        </div>

        <h3 className="blog-card__title">{blog.title}</h3>

        <p className="blog-card__excerpt">
          {blog.content.substring(0, 120).trimEnd()}…
        </p>

        <div className="blog-card__footer">
          <button
            className={`blog-card__like-btn ${liked ? "blog-card__like-btn--active" : ""} ${loading ? "blog-card__like-btn--loading" : ""}`}
            onClick={handleLike}
            disabled={loading}
            aria-label={liked ? "Unlike this post" : "Like this post"}
          >
            <svg
              className="blog-card__heart"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{likes}</span>
          </button>

          <Link className="blog-card__read-link" to={`/blog/${blog._id}`}>
            Read article
            <svg
              className="blog-card__arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;