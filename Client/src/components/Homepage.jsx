import React, { useContext } from "react";
import blogImage from "../assets/blogApp.png";
import Blogcard from "./Blogcard";
import TestAd from "./TestAd";
import { authencationContext } from "../App";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { search, setSearch } = useContext(authencationContext);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full mt-5">
        <img
          src={blogImage}
          alt="Blog Banner"
          className="h-[300px] w-full object-cover px-4 rounded-3xl"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-white max-w-2xl">
            Discover insightful blog posts and articles tailored to your
            interests.
          </h1>

          {/* Search Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for tags, keywords, articles, title, author"
              className="bg-white p-2 rounded-lg outline-none w-full sm:w-72 md:w-96"
            />

            <Link to="/search" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto p-2 border border-slate-600 bg-white rounded-lg text-green-600 hover:text-black font-medium flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                Search Post
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Ads & Blogs */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <TestAd />
        <Blogcard />
      </div>
    </div>
  );
};

export default Homepage;
