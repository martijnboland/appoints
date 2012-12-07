var User = require('../../models/user');

exports.create = function(req, res){
  var userId = req.body.email;
  var user = new User({ userId: userId, email: req.body.email, name: req.body.name, provider: 'local' });
  user.password = req.body.password;
  user.passwordConfirmation = req.body.confirmPassword;
  user.save(function(err, user) {
    if (err) {
      return res.send('400', err);
    }
    return res.send('201', user);
  });
};