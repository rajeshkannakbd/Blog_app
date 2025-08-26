const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const connectdb = require('./config/database');
const postRoutes = require('./Routes/postRoutes');
const authRoutes = require("./Routes/authRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const description = require("./Routes/generateDescriptionRoute")
const userRoutes = require("./Routes/userRoutes") 
const {axios} = require("axios");


const app = express() 

require('dotenv').config();
 
app.use(cors())
app.use(express.json())

const openaiKey = process.env.OPENAI_API_KEY;

app.use("/post",postRoutes)
app.use("/auth",authRoutes)
app.use("/admin",adminRoutes)
app.use("/new",description)
app.use("/user",userRoutes)

connectdb();

const port = process.env.PORT || 8000

app.listen(port,()=>{console.log(`Server is running on port ${port}`);
})
