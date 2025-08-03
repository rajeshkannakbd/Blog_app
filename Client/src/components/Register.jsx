import axios from "axios";
import React, { useEffect, useState } from "react";
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
          "http://localhost:8000/auth/register",
          {
            name,
            email,
            password,
          }
        );
        console.log("Registration successful:", response.data);
        navigate("/login")
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };
 
  return (
    <div className=" min-h-screen w-auto -mt-14 flex items-center justify-center">
      <div className=" border-2 h-auto w-96">
        <center>
          <h1 className=" text-xl font-medium text-green-600 mt-4">Register</h1>
        </center>
        <form action="" onSubmit={handlesubmit}>
          <div className=" flex flex-col mx-2 my-5 gap-4">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder=" Enter the Name"
              className=" border-slate-500 border-2 outline-none rounded-md p-2"
            />
          </div>
          <div className=" flex flex-col mx-2 my-5 gap-4">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder=" Enter the Email"
              className=" border-slate-500 border-2 outline-none rounded-md p-2"
            />
          </div>
          <div className=" flex flex-col mx-2 my-5 gap-4">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder=" Enter the Password"
              className=" border-slate-500 border-2 outline-none rounded-md p-2"
            />
          </div>
          <center>
            <button
              type="submit"
              className=" bg-green-400 p-2 mt-2 rounded-lg text-white w-32 text-lg font-semibold hover:text-slate-500"
            >
              Sign Up
            </button>
          </center>
          <center className=" mt-3 mb-3 hover:text-green-400">
            <Link to={"/login"}>Already have An account ?</Link>
          </center>
        </form>{" "}
      </div>
    </div>
  );
 };
export default Register;
