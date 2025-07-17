import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const[password,setPassword] = useState('')
   const[email,setEmail] = useState('')
   const [message,setmessage] = useState('')
   const [loading,setLoading] = useState('')
   const handleSubmit = async(e)=>{
      e.preventDefault()
      axios.post("http://localhost:8000/auth/login",{email:email,password:password})
      .then((response)=>{console.log(response);alert("sucessfully logined")})
      .catch(err=>console.log(err))
   }
   
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-8xl font-semibold text-center mb-6  text-gray-700">Login to Your Account</h2>

        {message && (
          <div className={`mb-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        </div>
        </div>      
  );
};

export default Login;
