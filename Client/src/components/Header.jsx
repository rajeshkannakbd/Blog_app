import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authencationContext } from "../App";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(authencationContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Proper logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setIsAuthenticated(false);       
    navigate("/login");              
  };

  return (
    <header className="border-b-2 border-slate-400 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <Link to="/" className="font-bold text-lg">
          Story<span className="text-blue-600">Scribe</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8">
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/create"><h1>Writer Dashboard</h1></Link>
        <Link to="/history"><h1>Blogs</h1></Link>
        <Link to="/about"><h1>About</h1></Link>
      </nav>

      {/* Auth Buttons - Desktop */}
      <div className="hidden md:block">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white rounded-lg px-3 py-2"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <h1 className="bg-green-600 text-white rounded-lg px-3 py-2">
              Login
            </h1>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white border rounded-lg shadow-lg p-4 flex flex-col gap-4 w-48 z-50 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Writer Dashboard</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-400 text-white rounded-lg px-3 py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-green-600 text-white rounded-lg px-3 py-2 text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
