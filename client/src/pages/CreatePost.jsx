import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../api/axiosInstance";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = async () => {
    try {
      await axios.post("/posts", { title, content });
      alert("Blog created!");
    } catch (err) {
      alert("Error creating blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input className="w-full p-2 border mb-4" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill value={content} onChange={setContent} />
      <button className="mt-4 bg-green-600 text-white px-4 py-2" onClick={submitHandler}>Publish</button>
    </div>
  );
};

export default CreatePost;
