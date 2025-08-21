// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios';

// const Singlepage = () => {
//   const {id} = useParams();
//   useEffect(()=>{
//     const getblog = async()=>{
//         axios.get(`http://localhost:8000/post/${id}`)
//         .then((data)=>console.log(data.data))
//         .catch((err)=>console.log(err))
//     };
//     getblog()
//   },[])
//   return (
//     <div>
//          <h1>single page application</h1>
//     </div>
//   )
// }

// export default Singlepage
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import TestAd from "./TestAd";
import { ThreeDot } from "react-loading-indicators";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://blog-app-server-kgb0.onrender.com/post/${id}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (loading) return <div className="text-center mt-10"><ThreeDot color="#325bb0" size="large" text="" textColor="" /></div>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <>
      <TestAd />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-6 bg-white rounded-lg shadow">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-snug">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mb-4">
          <p className="mb-1 sm:mb-0">
            {capitalizeFirstLetter(blog.author?.name || "Unknown Author")}
          </p>
          <p>
            {new Date(blog.createdAt).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Blog Image */}
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-md mb-6"
          />
        )}

        {/* Blog Content */}
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* Blog Meta */}
        <div className="mt-6 border-t pt-4 text-gray-500 text-xs sm:text-sm">
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {blog.tags
              .split(",")
              .map((tag) => `#${tag.trim()}`)
              .join(" ")}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Visibility:</span> {blog.visibility}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {blog.status}
          </p>
        </div>
      </div>
      <TestAd />
    </>
  );
};

export default BlogDetail;
