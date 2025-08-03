const postModel = require("../Models/postModel");
const router = require("express").Router();

router.get( "/all", async(req, res) => {
  try {
    const blogs = await postModel.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({message:"error on fetching products",error});
  }
});

router.patch('/blogs/:id/approve', async (req,res) => {
  try {
     const blog = await postModel.findByIdAndUpdate(req.params.id, { visibility: 'public' }, { new: true });
  res.status(200).json(blog);
  } catch (error) {
    res.status(200).json({message:"error on updatind " ,error : error})
  }
});

module.exports = router;