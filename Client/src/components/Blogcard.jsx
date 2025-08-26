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
        <h1 className="text-lg font-semibold">No blogs available</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
        Latest Blogs
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <Link to={`/blog/${blog._id}`}>
              <img
                src={blog.imageUrl || blogImage}
                alt="blog"
                className="h-56 w-full object-cover"
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5">
              {/* Author & Date */}
              <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
                <p className="flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${blog.author?.name}&background=random`}
                    alt="author"
                    className="w-6 h-6 rounded-full"
                  />
                  {capitalizeFirstLetter(blog.author?.name || "Unknown")}
                </p>
                <p>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Title */}
              <Link to={`/blog/${blog._id}`}>
                <h2 className="text-lg font-semibold text-gray-900 hover:text-green-600 line-clamp-2">
                  {blog.title}
                </h2>
              </Link>

              {/* Preview */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-3 flex-grow">
                {blog.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.tags?.split(",").map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <button
                  onClick={() => toggleLike(blog._id)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
                >
                  {blog.likedByUser ? "❤️ Unlike" : "🤍 Like"}{" "}
                  <span className="text-gray-500">({blog.likeCount})</span>
                </button>
                <button className="text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
                  📌 Save For Later
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogcard;
