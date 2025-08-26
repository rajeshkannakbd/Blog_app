const express =require('express');
const UserModel = require('../Models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret_key = process.env.jwt_secret_key


router.post("/register",async(req,res)=>{
  try{
 const {name,email,password} = req.body;
 const hashedpass = bcrypt.hashSync(password,10)
  const user = await UserModel.create({name,email,password:hashedpass})
  const token = jwt.sign({id:user._id,email:user.email},jwt_secret_key,{expiresIn:'3h'})
  res.status(201).json({user:user,token:token})
  }
  catch(err){
    res.status(500).json(err)
  }
})
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    if (!user.firstLoginAt) {
      user.firstLoginAt = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      jwt_secret_key,
      { expiresIn: "3h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
  }
});

module.exports = router;