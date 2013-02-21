var User = require('../../models/user');
var mailer = require('../../models/emails');

exports.create = function(req, res){
  var user = new User(req.body);
  var localReq = req;
  user.provider = 'local';
  user.userId = req.body.email;
  user.save(function(err, user) {
    if (err) {
      return res.send('400', err);
    }
    mailer.send('signup.jade', { 
      email: user.email, 
      subject: 'Registration confirmation',
      fullName: user.name,
      confirmationUrl: 'http://' + localReq.headers.host + '/api/account/confirm/' + user.id
    });
    res.send('201', user);
  });
};

exports.confirm = function(req, res) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    user.isPending = false;
    user.save(function(err, user) {
      if (! err) {
        res.redirect('/confirmsuccess');
      }
      else {
        res.send('400', err);
      }
    })
  });
}

exports.login = function(req, res) {
  res.send('200', req.session);
}

exports.me = function(req, res) {
  if (req.user) {
    return res.send('200', { 
      "isAuthenticated": true, 
      "userId": req.user.userId, 
      "name": req.user.name, 
      "email": req.user.email, 
      "provider": req.user.provider });
  }
  res.send('200', {
    "isAuthenticated": false,
    "name": "Anonymous user"
  })
}

exports.logout = function (req, res) {
  req.logout();
  res.send('200', 'Logged out successfully');
};
