import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blog-app-server-kgb0.onrender.com/auth/register",
        { name, email, password }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center -mt-8 justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-green-600 text-center mb-6">
          Register
        </h1>

        <form onSubmit={handlesubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Enter your name"
              className="w-full border border-slate-400 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your email"
              className="w-full border border-slate-400 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
              className="w-full border border-slate-400 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold text-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
