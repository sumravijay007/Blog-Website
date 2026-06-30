import { useState } from "react";
import axios from "axios";
import "./CreateBlog.css";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      setSuccess(true);
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setImage(null);
      setImagePreview(null);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to publish blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cb-page">
      <div className="cb-container">

        {/* Page header */}
        <header className="cb-header">
          <h1 className="cb-header__title">Write a new post</h1>
          <p className="cb-header__sub">Share your ideas, stories, and expertise with the world.</p>
        </header>

        {/* Success banner */}
        {success && (
          <div className="cb-banner cb-banner--success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Blog published successfully!
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="cb-banner cb-banner--error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form className="cb-form" onSubmit={handleSubmit}>

          {/* Title */}
          <div className="cb-field">
            <label className="cb-label">
              Title <span className="cb-required">*</span>
            </label>
            <input
              className="cb-input"
              type="text"
              placeholder="Give your post a compelling title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Content */}
          <div className="cb-field">
            <label className="cb-label">
              Content <span className="cb-required">*</span>
            </label>
            <textarea
              className="cb-textarea"
              placeholder="Tell your story…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              rows={10}
            />
            <span className="cb-char-count">{content.length} characters</span>
          </div>

          {/* Category + Tags side by side */}
          <div className="cb-row">
            <div className="cb-field">
              <label className="cb-label">Category</label>
              <input
                className="cb-input"
                type="text"
                placeholder="e.g. Technology, Travel…"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="cb-field">
              <label className="cb-label">Tags</label>
              <input
                className="cb-input"
                type="text"
                placeholder="e.g. react, webdev…"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Image upload */}
          <div className="cb-field">
            <label className="cb-label">Featured Image</label>

            {imagePreview ? (
              <div className="cb-preview">
                <img src={imagePreview} alt="Preview" className="cb-preview__img" />
                <div className="cb-preview__overlay">
                  <button type="button" className="cb-preview__remove" onClick={removeImage}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Remove
                  </button>
                </div>
                <span className="cb-preview__name">{image?.name}</span>
              </div>
            ) : (
              <label
                className="cb-dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="cb-dropzone__input"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
                <svg className="cb-dropzone__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="cb-dropzone__primary">
                  <strong>Click to upload</strong> or drag & drop
                </p>
                <p className="cb-dropzone__secondary">PNG, JPG, WEBP up to 10 MB</p>
              </label>
            )}
          </div>

          {/* Submit */}
          <div className="cb-form__footer">
            <button
              type="submit"
              className="cb-submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="cb-submit__spinner" />
                  Publishing…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Publish Post
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateBlog;