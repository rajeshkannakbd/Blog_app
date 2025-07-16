import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      {posts.map((post) => (
        <div key={post._id} className="p-4 border mb-2">
          <Link to={`/blog/${post._id}`}>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + "..." }} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
