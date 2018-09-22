const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../helpers/auth");

const Story = require("../models/Story");

router.get("/", ensureGuest, (req, res) => {
  res.render('home/welcome.hbs');
});

router.get("/dashboard", ensureAuth, (req, res) => {
  Story.find({user: req.user.id})
    .then(stories=>{
      res.render("home/dashboard", {stories: stories});
    })
});

router.get("/about", (req, res) => {
  res.render("home/about");
});



module.exports = router;