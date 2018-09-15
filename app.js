require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session')
const app = express();
const port = process.env.PORT;

//express session configs
app.use(session({ //use before passport MW, passport uses express session
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
//Passport configs
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
 
//set global session vars
app.use((req, res, next)=>{
  res.locals.user = req.user ||null;
  next();
})

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
