import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <div className="font-bold text-xl"><Link to="/">MyBlog</Link></div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/create">Create</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
