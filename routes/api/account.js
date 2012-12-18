var User = require('../../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.provider = 'local';
  user.userId = req.body.email;
  user.save(function(err, user) {
    if (err) {
      return res.send('400', err);
    }
    return res.send('201', user);
  });
};

exports.login = function(req, res) {
  return res.send('200', req.session);
}

exports.me = function(req, res) {
  if (req.user) {
    return res.send('200', { 
      "isAuthenticated": "true", 
      "userId": req.user.userId, 
      "name": req.user.name, 
      "email": req.user.email, 
      "provider": req.user.provider });
  }
  return res.send('200', {
    "isAuthenticated": "false"
  })
}

exports.logout = function (req, res) {
  req.logout();
  res.send('200', 'Logged out successfully');
};
