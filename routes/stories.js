const express = require("express");
const router = express.Router();
const {ensureAuth} = require("../helpers/auth");

router.get("/", (req, res) => {
  res.render('stories/index');
});
// add story form
router.get("/add", ensureAuth, (req, res) => {
  res.render('stories/add');
});

module.exports = router;