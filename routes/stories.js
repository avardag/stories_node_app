const express = require("express");
const router = express.Router();
const {ensureAuth} = require("../helpers/auth");

const Story = require("../models/Story");

router.get("/", (req, res) => {
  Story.find({status: "public"})
  .populate("user")
  .then(stories=>{
    res.render('stories/index', {stories});
    })
});

// add story form
router.get("/add", ensureAuth, (req, res) => {
  res.render('stories/add');
});

// edit story form
router.get("/edit/:id", ensureAuth, (req, res) => {
  Story.findOne({_id: req.params.id})
    .then(story=>{
      res.render("stories/edit", {story: story})
    })
});
// edit story form - POST
router.put("/:id", (req, res) => {
  
  Story.findOne({_id: req.params.id})
    .then(story=>{
      let allowComments;
      if (req.body.allowComments) {
        allowComments = true
      } else {
        allowComments = false
      }
      //NEw values
      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;

      story.save()
        .then(story=>{
          res.redirect("/dashboard")
        })
    })
});

// show single story
router.get("/:id", (req, res, next)=>{
  Story.findOne({_id: req.params.id})
    .populate("user")
    .populate("comments.commentUser")//to use user info of commenter
    .then(story=>{
      res.render("stories/show", {story: story})
    })
})
router.post("/", ensureAuth, (req, res) => {
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
      res.redirect(`/stories/${story._id}`)
    })
    .catch(err=> console.log(err))

  });

//delete story
router.delete("/:id", (req, res)=>{
  Story.remove({_id: req.params.id})
    .then(_=>{
      res.redirect("/dashboard");
    })
})

// COMMENTS
// add comment action="/stories/comment/{{story.id}}"
router.post("/comment/:id", (req, res)=>{
  Story.findOne({_id: req.params.id})
    .then(story=>{
      const newComment={
        commentBody: req.body.commentBody,
        commentUser: req.user.id
      }
      //Add newcomment to stories comments array
      story.comments.unshift(newComment);
      story.save()
        .then(story=>{
          res.redirect(`/stories/${story.id}`);
        })
    })
    .catch(err=> console.log(err))
})
  
module.exports = router;