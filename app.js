require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT;
//ROUTES
app.get("/", (req, res)=>{
  res.send("It works")
})
//SERVER
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
  
})