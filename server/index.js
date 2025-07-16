const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const connectdb = require('./config/database');
const postRoutes = require('./Routes/postRoutes');
const authRoutes = require("./Routes/authRoutes")

const app = express() 

require('dotenv').config();
 
app.use(cors())
app.use(express.json())

app.use("/post",postRoutes)
app.use("/auth",authRoutes)

connectdb();

const port = process.env.PORT || 8000

app.listen(port,()=>{console.log(`Server is running on port ${port}`);
})
