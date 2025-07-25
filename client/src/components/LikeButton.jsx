import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

const LikeButton = ({ blogId, initialLikes }) => {
  const { user, token } = useContext(AuthContext);

  // Ensure likes is an array
  const safeLikes = Array.isArray(initialLikes) ? initialLikes : [];

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(safeLikes.length);

  useEffect(() => {
    if (user && safeLikes.includes(user._id)) {
      setLiked(true);
    }
  }, [user, safeLikes]);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/post/${blogId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.liked) {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition duration-200 mb-4"
    >
      <Heart fill={liked ? "currentColor" : "none"} />
      <span>{likesCount} {likesCount === 1 ? "Like" : "Likes"}</span>
    </button>
  );
};

export default LikeButton;
