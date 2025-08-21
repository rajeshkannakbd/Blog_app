import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user_id = storedUser?._id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const generateDescription = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://blog-app-server-kgb0.onrender.com/new/generate-description",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, tags }),
        }
      );

      const data = await response.json();
      if (data.description) {
        setDescription(data.description);
        setContent(data.description);
      } else {
        setError("No description returned.");
      }
    } catch (err) {
      setError("Failed to connect to backend.");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !tags || !image) {
      return alert("Please fill in all fields and select an image.");
    }

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "blog_unsigned");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dh9fmwhsk/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;

      const blogData = {
        title,
        content,
        tags,
        description,
        author: user_id,
        visibility,
        imageUrl,
      };

      await axios.post(
        "https://blog-app-server-kgb0.onrender.com/post/newblog",
        blogData
      );

      alert("Blog posted successfully!");

      setTitle("");
      setContent("");
      setTags("");
      setDescription("");
      setVisibility("public");
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 mb-10 bg-white rounded-lg shadow mt-6 sm:mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
        Create New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-sm sm:text-base"
          required
        />

        {/* Tags + Generate */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="flex-1 p-2 border rounded text-sm sm:text-base"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
            onClick={generateDescription}
          >
            {loading ? "Generating..." : "Generate Description"}
          </button>
        </div>

        {/* Visibility */}
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full sm:w-auto p-2 border rounded-lg text-sm sm:text-base"
        >
          <option value="public" className=" rounded-md">Public</option>
          <option value="private" className=" rounded-md">Private</option>
        </select>

        {/* Markdown Editor */}
        <SimpleMDE
          value={content}
          onChange={setContent}
          className="text-sm sm:text-base"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block mt-2 text-sm sm:text-base"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full h-48 sm:h-64 object-cover rounded-lg"
          />
        )}

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition text-sm sm:text-base"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
