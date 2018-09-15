require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const port = process.env.PORT;

//Passport configs
require("./config/passport")(passport);

//Mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(()=> console.log("MongoDb connected"))
  .catch((err)=> console.log(err))

//Route imports
const authRoutes = require("./routes/auth");

//ROUTES
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("It works");
});

//SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
