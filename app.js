require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());// parse application/json

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
 
//helpers
const { truncate, stripTags } = require("./helpers/hbs")

// Register Handlebars view engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      truncate: truncate,
      stripTags: stripTags
    }
  }));
// Use Handlebars view engine
app.set('view engine', '.hbs');
//set static folder
app.use(express.static(require("path").join(__dirname, "public")))

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
const homeRoutes = require("./routes/home");
const storiesRoutes = require("./routes/stories");

//ROUTES
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/stories", storiesRoutes);


//SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
