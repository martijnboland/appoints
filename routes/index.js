var User = require('../models/user');
var passport = require('passport');

exports.index = function(req, res){
  User.count({}, function(err, userCount) {
    if (err) {
      return res.send('Unable to connect to the database: ' + err);
    }
    else if (userCount === 0) {
      // Render installer when there is no admin user.
      return res.render('install', { errors: null });
    }
    else {
      res.render('index');
    }
  });
};

exports.install = function(req, res) {
  var errors = [];

  User.count({}, function(err, userCount) {
    if (userCount > 0) {
      errors.push('A user already exists.')
    }
    else
    {
      var user = new User(req.body);
      user.name = 'Administrator'
      user.provider = 'local';
      user.userId = req.body.email;
      user.roles = ['admin'];
      user.isPending = false;
      user.save(function(err, user) {
        if (err) {
          return res.render('install', { errors: err.errors });
        }
        else {
          return res.redirect('/');
        }
      });
    }
  });
  if (errors.length > 0) {
    return res.render('install', { errors: errors });
  }
}