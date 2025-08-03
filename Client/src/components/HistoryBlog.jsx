import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import TestAd from "./TestAd";
import { Link } from "react-router-dom";

const HistoryBlog = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user_id = storedUser?._id;
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getblogs = async () => {
      await axios
        .get(`http://localhost:8000/post/user/${user_id}/blogs`)
        .then((data) => setBlog(data.data))
        .catch((err) => console.log(err));
    };
    getblogs();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/post/delete/${id}`);
      alert("blog deleted");
      setBlog((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
    } catch (error) {
      console.log(error);
      alert("error on deleting");
    }
  };

  if(blog.length === 0 ){
    return(
      <div><center><h1 className=" text-2xl font-semibold mt-24 ">No Blogs Found !! </h1></center></div>
    )
  }

  return (
    <div className=" w-full">
      <TestAd />
      {blog.map((blog) => (
        <div
          key={blog._id}
          className=" w-full px-24 p-6 mb-10 mt-10 bg-white rounded shadow border"
        >
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          <p className="text-sm text-gray-600 mb-1">By {blog.author}</p>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(blog.createdAt).toLocaleString()}
          </p>

          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full bg-slate-100 h-96 object-contain rounded-md mb-6"
            />
          )}

          <div className="prose max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Tags:{" "}
              {blog.tags
                .split(",")
                .map((tag) => `#${tag.trim()}`)
                .join(" ")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Visibility: {blog.visibility}
            </p>
            <p className="text-sm text-gray-500">Status: {blog.status}</p>
            <div>
              <Link to={`/edit/${blog._id}`}>
                <button className=" bg-blue-500 p-2 mx-2 my-2 w-20 rounded-lg">
                  Edit
                </button>
              </Link>
              <button
                className=" bg-red-500 p-2 mx-2 my-2 w-20 rounded-lg"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <TestAd />
    </div>
  );
};

export default HistoryBlog;
