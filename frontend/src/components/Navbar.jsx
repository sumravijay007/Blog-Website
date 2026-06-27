import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon">✦</span>
        <span className="navbar__brand-text">StoryVerse</span>
      </Link>

      <div className="navbar__links">
        <Link
          to="/"
          className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""}`}
        >
          Home
        </Link>
        <Link to="/about"
        className={`navbar__link ${isActive("/about") ? "navbar__link--active" : ""}`}
        >About</Link>
        <Link
          to="/create-blog"
          className={`navbar__link ${isActive("/create-blog") ? "navbar__link--active" : ""}`}
        >
          Write
        </Link>
        <Link to="/myblogs"
          className={`navbar__link ${isActive("/myblogs") ? "navbar__link--active" : ""}`}
        >My Blogs</Link>
      </div>

      <div className="navbar__actions">
        <button className="navbar__logout-btn" onClick={handleLogout}>
          <svg
            className="navbar__logout-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;