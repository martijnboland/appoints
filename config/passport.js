var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function () {

  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.authenticate(email, password, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) { 
          return done(null, false); 
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function (user, fn) {
    fn(null, user.id);
  });

  passport.deserializeUser(function (id, fn) {
    User.findById(id, function (err, user) {
      fn(err, user);
    });
  });

}
