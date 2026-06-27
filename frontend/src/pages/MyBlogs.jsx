import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/BlogCard";
import "./MyBlogs.css";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    try {
      const response = await API.get("/blogs/myblogs");
      setBlogs(response.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (loading) {
    return (
      <div className="mb-page">
        <div className="mb-loading">
          <div className="mb-loading__spinner" />
          <p>Loading your posts…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-page">
      <div className="mb-container">

        {/* Header */}
        <header className="mb-header">
          <div>
            <h1 className="mb-header__title">My Posts</h1>
            <p className="mb-header__sub">
              {blogs.length > 0
                ? `You have ${blogs.length} published ${blogs.length === 1 ? "post" : "posts"}.`
                : "You haven't written anything yet."}
            </p>
          </div>
          {blogs.length > 0 && (
            <a href="/create-blog" className="mb-write-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Post
            </a>
          )}
        </header>

        {/* Grid or empty state */}
        {blogs.length > 0 ? (
          <div className="mb-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                refreshBlogs={fetchMyBlogs}
              />
            ))}
          </div>
        ) : (
          <div className="mb-empty">
            <div className="mb-empty__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h2 className="mb-empty__title">No posts yet</h2>
            <p className="mb-empty__sub">Share your first idea with the world.</p>
            <a href="/create-blog" className="mb-write-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Write your first post
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBlogs;