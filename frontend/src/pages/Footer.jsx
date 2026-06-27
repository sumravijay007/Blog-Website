import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* Brand Section */}
                <div className="footer__brand">
                    <h2 className="footer__logo"> MyBlog</h2>
                    <p className="footer__text">
                        Share your thoughts, stories, and ideas with the world.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer__links">
                    <h3>Quick Links</h3>
                    <Link to="/" className="footer__link">Home</Link>
                    <Link to="/" className="footer__link">Blogs</Link>
                    <Link to="/create-blog" className="footer__link">Create Blog</Link>
                    <Link to="/about" className="footer__link">About</Link>
                </div>

                {/* Categories */}
                <div className="footer__links">
                    <h3>Categories</h3>
                    <a href="#" className="footer__link">Technology</a>
                    <a href="#" className="footer__link">Design</a>
                    <a href="#" className="footer__link">Lifestyle</a>
                    <a href="#" className="footer__link">Education</a>
                </div>

                {/* Contact */}
                <div className="footer__contact">
                    <h3>Contact</h3>
                    <p>Email: support@myblog.com</p>
                    <p></p>

                    <div className="footer__social">
                        <a href="https://github.com/"><FaGithub /></a>
                        <a href="https://x.com/"><FaTwitter /></a>
                        <a href="https://www.instagram.com/"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;