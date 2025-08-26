import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/${storedUser._id}`
        );
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          bio: res.data.bio || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (storedUser?._id) {
      fetchUser();
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/user/${storedUser._id}`, formData);
      alert("Profile updated successfully!");
      navigate("/Profile");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Email (not editable) */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md resize-none"
              placeholder="Tell something about yourself..."
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
