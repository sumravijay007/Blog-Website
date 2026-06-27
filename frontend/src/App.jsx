import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import UpdateBlog from "./pages/UpdateBlog";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";

import MyBlogs from "./pages/MyBlogs";

import About from "./pages/About";



function App() {
  return (
    <Routes>
      {/* ❌ Public only (if logged in → redirect to home) */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* 🔒 PROTECTED ROUTES (LOGIN REQUIRED) */}

      <Route path="/" element={<ProtectedRoute><Navbar /> <Home /></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute><Navbar /><BlogDetails /></ProtectedRoute>} />

      <Route path="/create-blog" element={<ProtectedRoute><Navbar /><CreateBlog /></ProtectedRoute>} />
      <Route path="/update-blog/:id" element={<ProtectedRoute><Navbar /><UpdateBlog /></ProtectedRoute>} />

      <Route path="/myblogs" element={<ProtectedRoute><Navbar /><MyBlogs /></ProtectedRoute>} />

      <Route path="/about" element={<ProtectedRoute><Navbar /><About /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;