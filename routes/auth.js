const express = require("express");
const router = express.Router();
const passport = require('passport');

//auth route w/ google oAuth passport strategy
//scope == what info to share(email, profile)
router.get("/google", passport.authenticate('google', {scope: ["email", "profile"]}))

//google oAth redirect route
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
//check if user is signed in
router.get("/verify", (req, res)=>{
  if (req.user) { //if signed in, we should have req.user from passpor session
    console.log(req.user);
  } else {
    console.log("no Auth");
  }
})
// logout
router.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/");
})

module.exports = router;
