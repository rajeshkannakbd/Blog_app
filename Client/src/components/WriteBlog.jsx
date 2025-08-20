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
    const response = await fetch("http://localhost:8000/new/generate-description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, tags }),
    });

    const data = await response.json();

    if (data.description) {
      console.log("Generated description:", data.description);
      setDescription(data.description);
      setContent(data.description);
    } else {
      setError("No description returned.");
    }
  } catch (err) {
    console.error(err);
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

      await axios.post("http://localhost:8000/post/newblog", blogData);

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-5">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="button"
          className="p-2 bg-blue-400 rounded-lg"
          onClick={()=>generateDescription()}
        >
          {loading ? "Generating..." : "Generate Description"}
        </button>

        {/* {description && (
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            readOnly
          />
        )} */}

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-auto p-2 border rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <SimpleMDE value={content} onChange={setContent} />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block mt-2"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full h-48 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
