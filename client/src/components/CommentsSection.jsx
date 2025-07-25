import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const CommentsSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const { user, token } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/post/${blogId}/comments`
      );
      setComments(res.data);
    } catch (err) {
      toast.error("Failed to load comments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/post/${blogId}/comments`,
        { text: newComment, userId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      setComments([res.data.comment, ...comments]);
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/post/${blogId}/comments/${commentId}`,
        {
          data: { userId: user._id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  const handleEdit = async (commentId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/post/${blogId}/comments/${commentId}`,
        { text: editText, userId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, text: editText } : c
        )
      );
      setEditingCommentId(null);
      toast.success("Comment updated");
    } catch (err) {
      toast.error("Failed to update comment");
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-600">Login to write a comment.</p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="border-b pb-2">
              {editingCommentId === comment._id ? (
                <>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="mt-1 space-x-2">
                    <button
                      onClick={() => handleEdit(comment._id)}
                      className="text-sm text-white bg-green-600 px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-800">{comment.text}</p>
                  <p className="text-sm text-gray-500">
                    - {comment.author?.name || "Anonymous"}
                  </p>
                  {user && comment.userId === user._id && (
                    <div className="space-x-2 mt-1">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditText(comment.text);
                        }}
                        className="text-sm text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsSection;
