import React, { useEffect, useState } from "react";
import blogImage from "../assets/blogApp.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

const Blogcard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://blog-app-server-kgb0.onrender.com/post/", {
          headers: {
            "x-user-id": user?._id,
          },
        });
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleLike = async (id) => {
    if (!user?._id) {
      alert("Please log in to like posts.");
      return;
    }
    const blog = blogs.find((b) => b._id === id);
    if (!blog) return;

    const url = blog.likedByUser
      ? `https://blog-app-server-kgb0.onrender.com/post/${id}/unlike`
      : `https://blog-app-server-kgb0.onrender.com/post/${id}/like`;

    try {
      const response = await axios.post(url, {}, { headers: { "x-user-id": user?._id } });

      const updatedBlogs = blogs.map((b) =>
        b._id === id
          ? {
              ...b,
              likedByUser: response.data.liked,
              likeCount: response.data.likeCount,
            }
          : b
      );

      setBlogs(updatedBlogs);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <ThreeDot color="#325bb0" size="large" text="Loading blogs..." textColor="#325bb0" />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h1>No blogs available</h1>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-10 px-4 sm:px-6 md:px-12 lg:px-24">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="relative bg-white shadow-md border border-gray-300 rounded-lg overflow-hidden flex flex-col"
        >
          {/* Title */}
          <Link to={`/blog/${blog._id}`}>
          <h1 className="text-lg sm:text-xl font-bold p-4 line-clamp-2">
            {blog.title}
          </h1></Link>

          {/* Author & Date */}
          <div className="flex justify-between px-4 text-gray-500 text-xs sm:text-sm">
            <p>{capitalizeFirstLetter(blog.author?.name || "Unknown Author")}</p>
            <p>
              {new Date(blog.createdAt).toLocaleString([], {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Image */}
          <img
            src={blog.imageUrl || blogImage}
            alt="blog"
            className="h-48 w-full object-cover mt-4 mb-4 shadow-md"
          />

          {/* Content Preview */}
          <p className="text-sm sm:text-base text-justify px-4 py-2 line-clamp-3 flex-grow">
            {blog.content}
          </p>

          {/* Tags & Read More */}
          <div className="flex flex-wrap gap-2 px-4 py-2">
            {blog.tags?.split(",").map((tag, idx) => (
              <span
                key={idx}
                className="border border-slate-400 px-2 py-1 rounded-md text-xs sm:text-sm"
              >
                {tag.trim()}
              </span>
            ))}
            <Link to={`/blog/${blog._id}`}>
              <span className="border border-green-500 px-3 py-1 rounded-md text-green-600 hover:bg-green-600 hover:text-white transition text-xs sm:text-sm cursor-pointer">
                Read More
              </span>
            </Link>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={() => toggleLike(blog._id)}
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              {blog.likedByUser ? (
                <span className="text-red-500">❤️ Unlike</span>
              ) : (
                <span className="text-gray-600">🤍 Like</span>
              )}
              <span className="ml-1 text-gray-600">{blog.likeCount}</span>
            </button>
            <span className="text-xs sm:text-sm bg-gray-100 border px-2 py-1 rounded-full">
              Save For Later
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogcard;
