const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: { 
    type: String
  },
  lastName: { 
    type: String
  },
  userImage: { 
    type: String
  }
});

//create collection adn add schema
module.exports = mongoose.model("User", userSchema);