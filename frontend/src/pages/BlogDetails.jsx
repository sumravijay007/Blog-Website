import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Comments from "../components/Comments";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
    setLikes(res.data.likes.length);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like");
      return;
    }
    setLikeLoading(true);
    try {
      const res = await API.put(`/blogs/like/${id}`);
      setLikes(res.data.likes.length);
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Like error:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeleteLoading(true);
    try {
      await API.delete(`/blogs/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog.");
      setDeleteLoading(false);
    }
  };

  const wordCount = blog?.content?.split(" ").length ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  if (!blog) {
    return (
      <div className="bd-loading">
        <div className="bd-loading__spinner" />
        <p>Loading article…</p>
      </div>
    );
  }

  const isOwner = user && user._id === blog.author._id;
  
  return (
    <div className="bd-page">
      <div className="bd-container">

        {/* Header */}
        <header className="bd-header">
          <div className="bd-header__meta">
            <div className="bd-author-badge">
              <span className="bd-author-badge__avatar">
                {blog.author.username.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="bd-author-badge__name">{blog.author.username}</p>
                <p className="bd-author-badge__sub">{readTime} min read</p>
              </div>
            </div>

            {isOwner && (
              <div className="bd-owner-actions">
                <button
                  className="bd-btn bd-btn--edit"
                  onClick={() => navigate(`/update-blog/${id}`)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
                <button
                  className="bd-btn bd-btn--delete"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                  {deleteLoading ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </div>

          <h1 className="bd-title">{blog.title}</h1>
        </header>

        {/* Cover image */}
        {blog.image && (
          <div className="bd-cover">
            <img src={blog.image} alt={blog.title} className="bd-cover__img" />
          </div>
        )}

        {/* Body */}
        <article className="bd-content">
          {blog.content.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : null
          )}
        </article>

        {/* Like bar */}
        <div className="bd-reactions">
          <button
            className={`bd-like-btn ${liked ? "bd-like-btn--active" : ""} ${likeLoading ? "bd-like-btn--loading" : ""}`}
            onClick={handleLike}
            disabled={likeLoading}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg
              className="bd-like-btn__heart"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{likes} {likes === 1 ? "like" : "likes"}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="bd-divider" />

        {/* Comments */}
        <section className="bd-comments">
          <h2 className="bd-comments__heading">Comments</h2>
          <Comments
            blogId={id}
            comments={blog.comments}
            refreshBlog={fetchBlog}
          />
        </section>

      </div>
    </div>
  );
}

export default BlogDetails;