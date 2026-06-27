import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
  const strengthClass = ["", "rg-strength--1", "rg-strength--2", "rg-strength--3", "rg-strength--4", "rg-strength--5"];
  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const res = await API.post("/auth/register", registerData);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rg-page">
      <div className="rg-blob rg-blob--1" />
      <div className="rg-blob rg-blob--2" />

      <div className="rg-card">

        {/* Brand */}
        <div className="rg-brand">
          <span className="rg-brand__icon">✦</span>
          <span className="rg-brand__name">Blogs</span>
        </div>

        {/* Header */}
        <div className="rg-header">
          <h1 className="rg-header__title">Create an account</h1>
          <p className="rg-header__sub">Join the community and start writing today.</p>
        </div>


        <form className="rg-form" onSubmit={handleSubmit}>

          {/* Username */}
          <div className="rg-field">
            <label className="rg-label" htmlFor="username">Username</label>
            <div className="rg-input-wrap">
              <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                className="rg-input"
                type="text"
                id="username"
                name="username"
                placeholder="yourname"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="rg-field">
            <label className="rg-label" htmlFor="email">Email address</label>
            <div className="rg-input-wrap">
              <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                className="rg-input"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="rg-field">
            <label className="rg-label" htmlFor="password">Password</label>
            <div className="rg-input-wrap">
              <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                className="rg-input rg-input--padded-right"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
              <button type="button" className="rg-eye-btn" onClick={() => setShowPassword(p => !p)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Strength meter */}
            {formData.password && (
              <div className="rg-strength">
                <div className="rg-strength__bars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`rg-strength__bar ${strength >= n ? strengthClass[strength] : ""}`}
                    />
                  ))}
                </div>
                <span className={`rg-strength__label ${strengthClass[strength]}`}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="rg-field">
            <label className="rg-label" htmlFor="confirmPassword">Confirm password</label>
            <div className="rg-input-wrap">
              <svg className="rg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                className={`rg-input rg-input--padded-right ${formData.confirmPassword && formData.password !== formData.confirmPassword ? "rg-input--error" : ""} ${formData.confirmPassword && formData.password === formData.confirmPassword ? "rg-input--valid" : ""}`}
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
              <button type="button" className="rg-eye-btn" onClick={() => setShowConfirm(p => !p)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                {showConfirm ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="rg-submit" disabled={loading}>
            {loading ? (
              <>
                <span className="rg-submit__spinner" />
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </button>


          {/* Error */}
          {error && (
            <div className="rg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <p className="rg-footer">
          Already have an account?{" "}
          <Link to="/login" className="rg-footer__link">Sign In</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;