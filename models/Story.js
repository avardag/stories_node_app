const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: { 
    type: String,
    default: 'public'
  },
  allowComments: { 
    type: Boolean,
    default: true
  },
  comments: [
    {
      commentBody:{
        type: String,
        require: true
      },
      commentDate: {
        type: Date,
        default: Date.now
      },
      commentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//create collection adn add schema
module.exports = mongoose.model("Story", storySchema, "stories");