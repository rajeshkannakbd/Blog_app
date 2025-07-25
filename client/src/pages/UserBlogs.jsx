import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "./SingleBlog";
import toast from "react-hot-toast";

const UserBlogs = () => {
  const { userId } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/user/${userId}`);
        setBlogs(res.data);
      } catch (err) {
        toast.error("Failed to fetch user's blogs");
      }
    };

    fetchUserBlogs();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">User's Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs by this user.</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
