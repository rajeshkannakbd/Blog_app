import React, { useContext, useState } from "react";
import blogImage from "../assets/blogApp.png";
import Blogcard from "./Blogcard";
import TestAd from "./TestAd";
import { authencationContext } from "../App";
import { Link } from "react-router-dom";

const Homepage = () => {
  const {search,setSearch}=useContext(authencationContext)
  return (
    <div className="min-w-screen ">
      <div className=" relative h-[300px] rounded-lg w-full mt-5">
        <img
          src={blogImage}
          alt=""
          className="h-[300px] w-full object-cover px-24 rounded-full"
        />
        <div className=" absolute top-[50%] px-[30%] -mt-10">
          <h1 className=" -mx-12 text-2xl text-nowrap font-serif text-white">
            Discover insightful blog posts and articles tailored to your
            interests.
          </h1>
          <input
            type="text"
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search for tags,keywords,articles'title,author"
            className=" bg-white p-2 mt-2 rounded-lg outline-none w-96"
          />
          <Link to={"/search"}>
          <button className=" p-2 mx-8  border-slate-600 bg-white rounded-lg outline-none text-green-600 hover:text-black font-medium">
            <div className=" flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search Post</div>
          </button></Link>
        </div>
      </div>
      <TestAd/>
      <Blogcard/>
    </div>
  );
};

export default Homepage;
