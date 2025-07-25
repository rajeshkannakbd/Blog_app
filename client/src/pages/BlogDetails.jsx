import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import LikeButton from "../components/LikeButton";
import CommentsSection from "../components/CommentsSection";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`);
      setBlog(res.data);
    } catch (err) {
      toast.error("Failed to fetch blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <LikeButton blogId={blog._id} initialLikes={blog.likes} />

      <div
        className="prose prose-lg max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <p className="text-sm text-gray-600 mb-2">Author: {blog.author?.name}</p>

      {user && user._id === blog.author?._id && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(`/edit/${blog._id}`)}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}

      <CommentsSection blogId={blog._id} />
    </div>
  );
};

export default BlogDetails;
