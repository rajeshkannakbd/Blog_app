import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
        alert("Error loading blog feed");
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>
      <div className="grid gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow-sm bg-white">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-2">By: {blog.author?.name || "Unknown"}</p>
              <Link
                to={`/blog/${blog._id}`}
                className="text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
