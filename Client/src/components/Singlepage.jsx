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

const BlogDetail = () => {
  const { id } = useParams(); // gets the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/post/${id}`);
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

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <>
      <TestAd />
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
        <p>{capitalizeFirstLetter(blog.author?.name || "Unknown Author")}</p>
        <p className=" mr-4 mb-4">
          {new Date(blog.createdAt).toLocaleString([], {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-96 object-contain rounded-md mb-6"
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
        </div>
      </div>
      <TestAd />
    </>
  );
};

export default BlogDetail;
