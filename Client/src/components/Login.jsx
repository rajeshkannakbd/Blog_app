import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authencationContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(authencationContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        { email, password }
      );

      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(from, { replace: true });
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center -mt-10 justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-green-600 text-center mb-6">
          Login
        </h1>

        <form onSubmit={handlesubmit} className="space-y-5">
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
            Login
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
