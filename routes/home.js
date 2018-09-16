const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render('home/welcome.hbs');
});
router.get("/dashboard", (req, res) => {
  res.render("home/dashboard");
});
router.get("/about", (req, res) => {
  res.render("home/about");
});



module.exports = router;