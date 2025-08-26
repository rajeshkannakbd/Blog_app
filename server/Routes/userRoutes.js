const express = require("express");
const UserModel = require("../Models/userModel");
const postModel = require("../Models/postModel");
const router = express.Router();

router.get("/:id",async(req,res)=>{
    try {
      const user = await UserModel.findById(req.params.id).select("-password");
      if(!user){
        res.status(404).json("User not found");      }
        res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // return updated doc
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
router.get("/blog/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // count posts created by this user
    const postsCount = await postModel.countDocuments({ author: user._id });

    res.status(200).json({ ...user, postsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports =router;