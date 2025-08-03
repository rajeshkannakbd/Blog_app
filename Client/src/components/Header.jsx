import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex items-center border-b-2 border-slate-400 p-4 justify-between  my-4">
      <div className=" flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <Link to="/home">
        <h1>
          Story<span>Scribe</span>
        </h1></Link>
      </div>
      <div>
        <ul className=" flex gap-20">
          <li>
            <Link to="/home"><h1>Home</h1></Link>
          </li>
          <li>
            <Link to="/create"><h1>Writer Dashboard</h1></Link>
          </li>
          <li>
            <Link to="/history"><h1>Blogs</h1></Link>
          </li>
          <li>
            <h1>About</h1>
          </li>
        </ul>
      </div>
      <Link to={"/login"}>
      <div>
        <h1 className=" bg-green-600 text-white rounded-lg px-3 py-2 ">
          Login
        </h1>
      </div></Link>
    </div>
  );
};

export default Header;
