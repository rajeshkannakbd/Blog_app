import React, { useContext, useEffect, useState } from "react";
import { authencationContext } from "../App";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import TestAd from "./TestAd";

const Search = () => {
  const [blog, setBlog] = useState([]);
  const { search, setSearch } = useContext(authencationContext);
  console.log("serach" + search);

  useEffect(() => {
    const searchblod = async () => {
      await axios
        .get("http://localhost:8000/post/")
        .then((data) => setBlog(data.data))
        .catch((err) => console.log(err));
    };
    searchblod();
  }, []);
  const filteredBlogs = blog.filter((blog) => {
    const searchTerm = search.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(searchTerm) ||
      blog.content?.toLowerCase().includes(searchTerm) ||
      blog.tags?.toLowerCase().includes(searchTerm) ||
      blog.author?.name?.toLowerCase().includes(searchTerm)
    );
  });

  console.log(filteredBlogs);
  

  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <h1>No blogs found</h1>
      </div>
    );
  }
  return (
    <div className="w-full">
      {search ? <h1 className=" ml-24 text-2xl font-sans">Search Results For : "<span className="text-blue-500 font-medium">{search.toUpperCase()}</span>"</h1> : <h1 className=" ml-24 text-2xl font-sans"> All Blogs </h1>}
      {filteredBlogs.map((blog, index) => (
        <div key={blog._id} className="w-full bg-white shadow mt-10 px-10">
          <div className="w-full px-4 py-6 md:px-10 max-w-screen-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
            <p className="text-sm text-gray-600 mb-1">By {blog.author?.name || "Unknown Author"}</p>
            <p className="text-sm text-gray-500 mb-4"> 
              {new Date(blog.createdAt).toLocaleString()}
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
         {(index + 1) % 2 === 0 && <TestAd />}
        </div>
      ))}
    </div>
  );
};
export default Search;
