var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var env = require('./environment');

module.exports = function () {

  passport.use(new LocalStrategy({ 
      usernameField: 'email' 
    }, 
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

  passport.use(new FacebookStrategy({
      clientID: env.settings.authProviders.facebook.clientId,
      clientSecret: env.settings.authProviders.facebook.clientSecret,
      callbackURL: env.settings.authProviders.facebook.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ userId: profile.id, provider: 'facebook' }, function (err, user) {
        if (! user) {
          // New user, add to DB
          user = new User({ userId: profile.id, provider: 'facebook', email: profile.emails[0].value , name: profile.displayName, isPending: false });
          user.setRandomPassword(function() {
            user.save(function(err, user) {
              if (err) {
                return done(err, null);
              }
              else {
                return done(err, user); 
              }
            });
          });
        }
        else {
          return done(err, user);
        }
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
