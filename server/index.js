const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const connectdb = require('./config/database');
const postRoutes = require('./Routes/postRoutes');

const app = express() 

require('dotenv').config();
 
app.use(cors())
app.use(express.json())

app.use("/post",postRoutes)

connectdb();

const port = process.env.PORT || 8000

app.listen(port,()=>{console.log(`Server is running on port ${port}`);
})
