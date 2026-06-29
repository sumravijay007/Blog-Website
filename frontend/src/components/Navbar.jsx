import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon">✦</span>
        <span className="navbar__brand-text">StoryVerse</span>
      </Link>

      {/* Hamburger */}
      <div
        className={`navbar__toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu */}
      <div className={`navbar__menu ${menuOpen ? "active" : ""}`}>
        <div className="navbar__links">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`navbar__link ${
              isActive("/") ? "navbar__link--active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`navbar__link ${
              isActive("/about") ? "navbar__link--active" : ""
            }`}
          >
            About
          </Link>

          <Link
            to="/create-blog"
            onClick={() => setMenuOpen(false)}
            className={`navbar__link ${
              isActive("/create-blog") ? "navbar__link--active" : ""
            }`}
          >
            Write
          </Link>

          <Link
            to="/myblogs"
            onClick={() => setMenuOpen(false)}
            className={`navbar__link ${
              isActive("/myblogs") ? "navbar__link--active" : ""
            }`}
          >
            My Blogs
          </Link>
        </div>

        <div className="navbar__actions">
          <button className="navbar__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;