import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import "./Home.css";
import Hero from "./Hero";
import Footer from "./Footer";

function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data.blogs || res.data);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data.blogs || res.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    })();
  }, []);
  return (
    <div className="home-container">
      
      <Hero/>
      <h1 className="page-title"> All Blogs</h1>
      <div className="blog-grid">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="blog-card-wrapper" key={blog._id}>
              <BlogCard blog={blog} refreshBlogs={fetchBlogs} />
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"></div>
            <h2>No blogs yet!</h2>
            <p>Be the first to share your story </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Home;