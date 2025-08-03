const express = require("express");
const postModel = require("../Models/postModel");
const { useParams } = require("react-router-dom");
const router = express.Router();

router.post("/newblog", async (req, res) => {
  try {
    const newpost = new postModel({...req.body});
    const savedpost = await newpost.save();
    res.json(savedpost).status(200);
  } catch (error) {
    console.log(error);
    res.json(error).status(500);
  }
});

router.get("/", async (req, res) => {
  const blogs = await postModel.find({ visibility: "public" }).populate("author", "name");
    const userId = req.headers["x-user-id"]; 

const blogsWithLikes = blogs.map(blog => ({
  ...blog._doc,
  likeCount: blog.likes.length,
  likedByUser: userId ? blog.likes.includes(userId) : false
}));


  res.status(200).json(blogsWithLikes);;
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id).populate("author", "name");
    if (!post) {
      res.status(404).json("post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "post get deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newpost = req.body;
    const updatedpost = await postModel.findByIdAndUpdate(id, newpost);
    res.status(200).json(updatedpost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error on updating the blog" });
  }
});

router.get("/user/:id/blogs", async (req, res) => {
  try {
    const userId = req.params.id;
    const userBlogs = await postModel.find({ author: userId });
    res.status(200).json(userBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user's blogs" });
  }
});

// Edit (update) a blog post by ID
router.put("/edit/:id", async (req, res) => {
  const blogId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      blogId,
      updatedData,
      { new: true } // return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

router.delete("/delete/:id",async(req,res)=>{
  const {id} = req.params;
  try {
   await postModel.findByIdAndDelete(id);
   res.status(200).json({message:"deleted sucessfully"});
    
  } catch (error) {
   res.json(500).json({message:"error on deleting"})
  }


})


router.post("/:id/like", async (req, res) => {
  const blog = await postModel.findById(req.params.id);
  const userId = req.headers["x-user-id"]; 

  if (!userId) return res.status(400).json({ message: "User ID missing" });
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (blog.likes.includes(userId)) {
    return res.status(400).json({ message: "Already liked" });
  }

  blog.likes.push(userId);
  await blog.save();

  res.json({ liked: true, likeCount: blog.likes.length });
});


// Unlike blog
router.post("/:id/unlike", async (req, res) => {
  const blog = await postModel.findById(req.params.id);
  const userId = req.headers["x-user-id"];

  if (!userId) return res.status(400).json({ message: "User ID missing" });
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.likes = blog.likes.filter((id) => id.toString() !== userId);
  await blog.save();

  res.json({ liked: false, likeCount: blog.likes.length });
});




module.exports = router;
