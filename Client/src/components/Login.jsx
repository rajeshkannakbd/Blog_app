import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useBlocker, useLocation, useNavigate } from "react-router-dom";
import { authencationContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const location = useLocation();
  const from = location.state?.from || "/home";
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } =
    useContext(authencationContext);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("https://blog-app-server-kgb0.onrender.com/auth/login", { email, password })
        .then((data) => {
          setUser(data.data.user);
          setIsAuthenticated(true);
          localStorage.setItem(
            "user",
            JSON.stringify(data.data.user)
          );
        });
      if (user) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" min-h-screen min-w-screen -mt-14 flex items-center justify-center">
      <div className=" border-2 h-96 w-96">
        <center>
          <h1 className=" text-xl font-medium text-green-600 mt-4">Login</h1>
        </center>
        <form action="" onSubmit={handlesubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder=" Enter the Password"
              className=" border-slate-500 border-2 outline-none rounded-md p-2"
            />
          </div>
          <center>
            <button
              type="submit"
              className=" bg-green-400 p-2 rounded-lg text-white w-32 text-lg font-semibold hover:text-slate-500"
            >
              Login
            </button>
          </center>
          <center className=" mt-3 hover:text-green-400">
            <Link to={"/register"}>Dont have An account ?</Link>
          </center>
        </form>{" "}
      </div>
    </div>
  );
};

export default Login;
