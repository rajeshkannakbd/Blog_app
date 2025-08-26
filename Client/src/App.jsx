import { Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Blogcard from "./components/Blogcard";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import WriteBlog from "./components/WriteBlog";
import Singlepage from "./components/Singlepage";
import { createContext, useState } from "react";
import ProtectedRoute from "./components/ProductedRoute";
import HistoryBlog from "./components/HistoryBlog";
import EditHistory from "./components/EditHistory";
import Search from "./components/Search";
import About from "./components/About";
import Profile from "./components/Profile";
import EditProfile from "./components/Profile/EditProfile";

export const authencationContext = createContext();
function App() {
  const storeduser = JSON.parse(localStorage.getItem("user"));
  const user_id = storeduser?._id;
  const [isAuthenticated, setIsAuthenticated] = useState(!!storeduser);
  const [search, setSearch] = useState("");
  return (
    <>
      <authencationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, search, setSearch }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/head" element={<Header />} />
            <Route path="/blog" element={<Blogcard />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <WriteBlog />
                </ProtectedRoute>
              }
            />
              <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
              <Route
              path="/editProfile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/blog/:id" element={<Singlepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About/>} />
          </Route>
        </Routes>
      </authencationContext.Provider>
    </>
  );
}

export default App;
