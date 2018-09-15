const express = require("express");
const router = express.Router();
const passport = require('passport');

//auth route w/ google oAuth passport strategy
//scope == what info to share(email, profile)
router.get("/google", passport.authenticate('google', {scope: ["email", "profile"]}))

module.exports = router;
