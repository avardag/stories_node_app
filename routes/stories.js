const express = require("express");
const router = express.Router();
const {ensureAuth} = require("../helpers/auth");

const Story = require("../models/Story");

router.get("/", (req, res) => {
  res.render('stories/index');
});

// add story form
router.get("/add", ensureAuth, (req, res) => {
  res.render('stories/add');
});

router.post("/", (req, res) => {
  let allowComments;
  if (req.body.allowComments) {
    allowComments = true
  } else {
    allowComments = false
  }
  
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }
  //create a story
  new Story(newStory)
    .save()
    .then(story=>{
      res.redirect(`/stories/show/${story._id}`)
    })
    .catch(err=> console.log(err))

  });
module.exports = router;