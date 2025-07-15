const mongoose = require('mongoose')
require('dotenv').config()

const connectdb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongodb connected succesfully");
    
  } catch (error) {
    console.log(error)
    
  }
}

module.exports= connectdb;