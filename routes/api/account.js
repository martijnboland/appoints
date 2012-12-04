var User = require('../../models/user');

exports.create = function(req, res){
  var user = new User({ email: req.body.email, name: req.body.name, provider: 'local' });
  user.password = req.body.password;
  user.save(function(err, user) {
    if (err) {
      return res.send('400', err);
    }
    return res.send('201', user);
  });
};