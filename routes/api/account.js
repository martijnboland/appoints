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
  return res.send('200', req.user);
}

exports.logout = function (req, res) {
  req.logout();
  res.send('200', 'Logged out successfully');
};
