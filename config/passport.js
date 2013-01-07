var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;
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
      return handleProviderResponse('facebook', profile.id, profile.emails[0].value, profile.displayName, done);
    }
  ));

  passport.use(new TwitterStrategy({
      consumerKey: env.settings.authProviders.twitter.consumerKey,
      consumerSecret: env.settings.authProviders.twitter.consumerSecret,
      callbackURL: env.settings.authProviders.twitter.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      return handleProviderResponse('twitter', profile.id, 'unknown', profile.displayName, done);
    }
  ));

  passport.use(new GoogleStrategy({
      consumerKey: env.settings.authProviders.google.consumerKey,
      consumerSecret: env.settings.authProviders.google.consumerSecret,
      callbackURL: env.settings.authProviders.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      return handleProviderResponse('google', profile.id, profile.emails[0].value, profile.displayName, done);
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

  function handleProviderResponse(provider, userId, email, displayName, done) {
    User.findOne({ userId: userId, provider: provider }, function (err, user) {
      if (! user) {
        // New user, add to DB
        user = new User({ userId: userId, provider: provider, email: email , name: displayName, isPending: false });
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
}
