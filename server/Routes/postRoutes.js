const express = require('express');
const postModel = require('../Models/postModel');
const router = express.Router();
const mongoose = require("mongoose"); 
const userModel = require("../Models/userModel");
const moment = require("moment");

router.post("/newblog",async(req,res)=>{
   try {
    const newpost = new postModel( req.body)
    const savedpost = await newpost.save()
    res.json(savedpost).status(200)
    
   } catch (error) {
    console.log(error);
    res.json(err).status(500)
   }
})
router.get("/", async (req, res) => {
  const post = await postModel.find({})
  res.status(200).json(post)
})

router.get("/:id",async(req,res)=>{
  const id = req.params.id
  try {
    const post = await postModel.findById(id)
    if(!post){
      res.status(404).json("post not found")
    }
    res.status(200).json(post)
    
  } catch (error) {
    console.log(error);
    
  }
})

router.delete("/:id",async(req,res)=>{
  const id = req.params.id
  try {
    const post = await postModel.findByIdAndDelete(id)
    res.status(200).json({message:"post get deleted"})
    
  } catch (error) {
    console.log(error);
    
  }
})

router.put("/:id",async(req,res)=>{
try{
  const id = req.params.id
   const newpost = req.body
   const updatedpost = await postModel.findByIdAndUpdate(id,newpost)
  res.status(200).json(updatedpost)
}catch(err){
  console.log(err);
  res.status(500).json({message:"error on updating the blog"})
}  
})

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await postModel.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user's blogs" });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = (post.likes || 0) + 1;

    await post.save({ validateBeforeSave: false }); // ✅ Skip schema validation

    res.status(200).json({ message: "Post liked", likes: post.likes });
  } catch (err) {
    console.error("Error updating likes:", err.message);
    res.status(500).json({ message: "Error updating likes" });
  }
});


// Add a comment to a post
router.post("/:id/comment", async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    if (!userId || !text) {
      return res.status(400).json({ message: "userId and text are required" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await userModel.findById(userId).select("username photo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId,
      text,
      username: user.username,
      photo: user.photo || "",
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ message: "Error adding comment" });
  }
});

// Get all comments of a post
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const formattedComments = post.comments.map(comment => ({
      _id: comment._id,
      userId: comment.userId,
      username: comment.username,
      photo: comment.photo,
      text: comment.text,
      createdAt: comment.createdAt,
      timeAgo: moment(comment.createdAt).fromNow(),
    }));

    res.status(200).json(formattedComments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/posts/:postId/comments/:commentId
router.put("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId, text } = req.body;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the comment by ID and match user
    const comment = post.comments.find(
      (c) =>
        c &&
        c._id?.toString() === commentId &&
        c.userId?.toString() === userId
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    // Update comment text
    comment.text = text;
    await post.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (err) {
    console.error("Edit comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/posts/:postId/comments/:commentId
router.delete("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req.body;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the index of the comment that matches both commentId and userId
    const commentIndex = post.comments.findIndex(
      (c) =>
        c &&
        c._id?.toString() === commentId &&
        c.userId?.toString() === userId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);
    await post.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;