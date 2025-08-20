import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    imageUrl: "",
    visibility: "public",
    status: "pending",
  });
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog-app-server-kgb0.onrender.com/post/${id}`);
        const { title, content, tags, imageUrl, visibility, status } = res.data;
        setFormData({ title, content, tags, imageUrl, visibility, status });
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-app-server-kgb0.onrender.com/post/edit/${id}`, formData);
      alert("Blog updated successfully");
      navigate("/history");
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-2 border rounded h-40"
          required
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditHistory;
