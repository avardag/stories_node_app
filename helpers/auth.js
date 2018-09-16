module.exports = {
  ensureAuth: function (req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/");
    }
  },
  ensureGuest: function (req,res,next){
    if(req.isAuthenticated()){
      res.redirect("/dashboard");  
    } else{
      return next();
    }
  }
}