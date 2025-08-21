import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import TestAd from "./TestAd";
import { Link } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

const HistoryBlog = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user_id = storedUser?._id;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getblogs = async () => {
      try {
        const { data } = await axios.get(
          `https://blog-app-server-kgb0.onrender.com/post/user/${user_id}/blogs`
        );
        setBlog(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getblogs();
  }, [user_id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://blog-app-server-kgb0.onrender.com/post/delete/${id}`
      );
      alert("Blog deleted");
      setBlog((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
    } catch (error) {
      console.log(error);
      alert("Error deleting blog");
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ThreeDot
          visible={true}
          height="80"
          width="80"
          color="#325bb0"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  // Empty state
  if (blog.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">
          No Blogs Found !!
        </h1>
      </div>
    );
  }

  // Blogs
  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <TestAd />
      {blog.map((blog) => (
        <div
          key={blog._id}
          className="w-full p-4 sm:p-6 mb-10 mt-10 bg-white rounded-lg shadow border"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{blog.title}</h1>
          <p className="text-sm text-gray-600 mb-1">By {blog.author}</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            {new Date(blog.createdAt).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full bg-slate-100 h-60 sm:h-80 md:h-96 object-contain rounded-md mb-6"
            />
          )}

          <div className="prose max-w-none text-sm sm:text-base">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-sm text-gray-500">
              Tags:{" "}
              {blog.tags
                .split(",")
                .map((tag) => `#${tag.trim()}`)
                .join(" ")}
            </p>
            <p className="text-sm text-gray-500">
              Visibility: {blog.visibility}
            </p>
            <p className="text-sm text-gray-500">Status: {blog.status}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={`/edit/${blog._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Edit
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => handleDelete(blog._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <TestAd />
    </div>
  );
};

export default HistoryBlog;
