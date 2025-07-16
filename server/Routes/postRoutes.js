const express = require('express');
const postModel = require('../Models/postModel');
const router = express.Router();

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

module.exports = router;