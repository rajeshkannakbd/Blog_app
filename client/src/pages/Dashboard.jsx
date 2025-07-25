// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/post`);
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch your blogs:", err);
      }
    };

    fetchUserBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs created yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mb-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">By {blog.author.name}</p>
            <div className="flex gap-3 mt-2">
              <Link
                to={`/edit/${blog._id}`}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
