import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./UpdateBlog.css";

function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category || "",
          tags: Array.isArray(res.data.tags) ? res.data.tags.join(", ") : res.data.tags || "",
        });
      } catch (err) {
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      await API.put(`/blogs/${id}`, data);
      setSuccess(true);
      setTimeout(() => navigate(`/blog/${id}`), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="ub-page">
        <div className="ub-loading">
          <div className="ub-loading__spinner" />
          <p>Loading your post…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ub-page">
      <div className="ub-container">

        {/* Header */}
        <header className="ub-header">
          <div className="ub-header__left">
            <button
              type="button"
              className="ub-back-btn"
              onClick={() => navigate(`/blog/${id}`)}
              aria-label="Back to post"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>
          </div>
          <div className="ub-header__center">
            <h1 className="ub-header__title">Edit post</h1>
            <p className="ub-header__sub">Your changes are saved when you click Update.</p>
          </div>
        </header>

        {/* Banners */}
        {error && (
          <div className="ub-banner ub-banner--error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="ub-banner ub-banner--success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Post updated! Redirecting…
          </div>
        )}

        <form className="ub-form" onSubmit={handleSubmit}>

          {/* Title */}
          <div className="ub-field">
            <label className="ub-label" htmlFor="title">
              Title <span className="ub-required">*</span>
            </label>
            <input
              className="ub-input"
              type="text"
              id="title"
              name="title"
              placeholder="Give your post a compelling title…"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Content */}
          <div className="ub-field">
            <label className="ub-label" htmlFor="content">
              Content <span className="ub-required">*</span>
            </label>
            <textarea
              className="ub-textarea"
              id="content"
              name="content"
              placeholder="Tell your story…"
              value={formData.content}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={10}
            />
            <span className="ub-char-count">{formData.content.length} characters</span>
          </div>

          {/* Category + Tags */}
          <div className="ub-row">
            <div className="ub-field">
              <label className="ub-label" htmlFor="category">Category</label>
              <input
                className="ub-input"
                type="text"
                id="category"
                name="category"
                placeholder="e.g. Technology, Travel…"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="ub-field">
              <label className="ub-label" htmlFor="tags">Tags</label>
              <input
                className="ub-input"
                type="text"
                id="tags"
                name="tags"
                placeholder="react, webdev, design…"
                value={formData.tags}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <span className="ub-hint">Separate with commas</span>
            </div>
          </div>

          {/* Actions */}
          <div className="ub-form__footer">
            <button
              type="button"
              className="ub-btn-cancel"
              onClick={() => navigate(`/blog/${id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ub-btn-submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="ub-spinner" />
                  Updating…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Update Post
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;