import React, { useState } from "react";
import axios from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      window.location.href = "/";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={loginHandler} className="max-w-md mx-auto mt-10 space-y-4">
      <input className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full p-2 border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-600 text-white px-4 py-2" type="submit">Login</button>
    </form>
  );
};

export default Login;
