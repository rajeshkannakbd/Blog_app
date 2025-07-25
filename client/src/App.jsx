import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import UserBlogs from "./pages/UserBlogs";
import AdminPanel from "./pages/AdminPanel";
import BlogList from "./pages/BlogList";
import SingleBlog from "./pages/SingleBlog";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Blog Routes */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />

        {/* Existing BlogDetails route, optional if redundant */}
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
