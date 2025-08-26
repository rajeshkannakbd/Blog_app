import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/blog/${storedUser._id}`
        );
        setUser(res.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    if (storedUser?._id) {
      fetchUser();
    }
  }, [storedUser]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-green-400 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">About</h3>
          <p className="mt-2 text-gray-600">
            {user.bio || "This user hasn’t added a bio yet."}
          </p>
        </div>

        {/* Dates Section */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-xl shadow-sm text-center">
            <p className="text-xl font-bold text-green-600">{user.postsCount || 0}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-md font-semibold text-green-600">
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
          {/* <div className="bg-gray-50 p-3 rounded-xl shadow-sm text-center col-span-2">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-md font-semibold text-green-600">
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div> */}
        </div>

        <Link to="/editProfile">
          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
