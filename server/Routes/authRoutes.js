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

router.post("/login",async(req,res)=>{
  try{
  const {email , password} =req.body
  const user = await UserModel.findOne({email})
  if(!user){
   return res.status(404).json({message:"no user exists"})
  }
  const ismatch = await bcrypt.compare(password,user.password)
  if(!ismatch){
   return res.status(401).json({message:"incoorect password"})
  }
  const token = jwt.sign({id:user._id,email:user.email},jwt_secret_key,{expiresIn:'3h'})
  res.status(200).json({user:user,token:token})
  }catch(err){
    res.status(500).json({message:"login failed",err})
  }
})

module.exports = router;