import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // adjust path as needed

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const { user } = useContext(AuthContext); // to check current user

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error loading blog:", err);
        alert("Failed to load blog.");
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/post/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog.");
    }
  };

  if (!blog) return <div className="text-center mt-10 text-gray-500">Loading blog...</div>;

  const isOwner = user && blog.author?._id === user._id;
  const isAdmin = user && user.role === "admin";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-6">By: {blog.author?.name || "Unknown"}</p>

      <div className="prose max-w-none mb-6">
        {blog.content}
      </div>

      {(isOwner || isAdmin) && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => navigate(`/edit/${blog._id}`)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(blog._id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleBlog;
