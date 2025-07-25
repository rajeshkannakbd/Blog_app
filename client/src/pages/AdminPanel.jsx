import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BlogCard from "./SingleBlog";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const { user, token } = useContext(AuthContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      toast.error("Access denied: Admins only");
    } else {
      fetchAllBlogs();
    }
  }, [user]);

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllBlogs(res.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      {allBlogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="grid gap-4">
          {allBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} isAdmin />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
