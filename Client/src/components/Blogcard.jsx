import React, { useEffect, useState } from "react";
import blogImage from "../assets/blogApp.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Blogcard = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://blog-app-server-kgb0.onrender.com/post/", {
          headers: {
            "x-user-id": user?._id, // pass current user's ID here
          },
        });
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
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
      ? `http://localhost:8000/post/${id}/unlike`
      : `http://localhost:8000/post/${id}/like`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "x-user-id": user?._id, // Replace with actual user ID later
          },
        }
      );

      // update just that blog in the blogs array
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

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="flex flex-wrap gap-4 my-10 mx-auto justify-center">
      {blogs.map((blog) => (
        <div key={blog._id} className="relative my-2 w-[400px] h-[550px]">
          <div className="border-2 m-2 border-black flex flex-col justify-between gap-6 px-4 py-4 h-full">
            <h1 className="text-xl font-bold text-wrap h-10 w-full">
              {blog.title}
            </h1>
            <div className="flex justify-between mx-4 text-slate-400 w-full text-sm">
              <p>
                {capitalizeFirstLetter(blog.author?.name || "Unknown Author")}
              </p>
              <p className=" mr-4">
                {new Date(blog.createdAt).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <img
              src={blog.imageUrl}
              alt="blog"
              className="h-[200px] w-full object-cover"
            />
            <p className="text-justify w-full line-clamp-3">{blog.content}</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <h3 className="border border-slate-500 px-3 py-1 rounded-md">
                4
              </h3>
              <h3 className="border border-slate-500 px-3 py-1 rounded-md">
                JavaScript
              </h3>
              <Link to={`/blog/${blog._id}`}>
                <h3 className="border border-slate-500 px-3 py-1 rounded-md text-nowrap text-green-400 hover:text-black font-medium cursor-pointer">
                  Read More
                </h3>
              </Link>
            </div>
            <h1 className="absolute -top-2 right-5 border-2 px-2 border-black bg-white rounded-full p-1 text-sm">
              Save For Later
            </h1>
            <button onClick={() => toggleLike(blog._id)}>
              {blog.likedByUser ? (
                <h5 className="size-6 ">unlike</h5>
              ) : (
                <h5 className="size-6 text-red-600">like</h5>
              )}
              <span className="ml-1 text-sm">{blog.likeCount}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogcard;
