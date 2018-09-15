const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

const User = require("../models/User");


module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    // grab user info from Google & save to DB
    // console.log(accessToken);
    // console.log(profile);
    const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf("?"));
    //'.....Xo4OzA/mo/photo.jpg?sz=50' cut off the part after q mark

    const newUser = {
      googleID: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      userImage: image,
    }
    //check for existing user in DB
    User.findOne({googleID: profile.id})
      .then(user=>{
        if (user) {
          done(null, user); //if there is a user already, move ahead with the user
        } else {//if no matching user, create one
          new User(newUser)
            .save()
            .then(user=>{
              done(null, user)
            })
        }
      })
      .catch(err=> console.log(err))
  }
));

  // save user in passport session
  passport.serializeUser((user, done)=>{
    done(null, user.id)//saved to session req.session.passport.user = {id:'..'}
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);//user object attaches to the request as req.user
    });
  });
}