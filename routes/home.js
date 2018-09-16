const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../helpers/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render('home/welcome.hbs');
});
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("home/dashboard");
});
router.get("/about", (req, res) => {
  res.render("home/about");
});



module.exports = router;