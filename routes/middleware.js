exports.ensureAuthenticated =  function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send('401', 'Unauthorized to access resource');
};

exports.ensureAdmin =  function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.hasRole('admin')) {
      return next();
    }
    return res.send('403', 'Access forbidden')
  }
  return res.send('401', 'Unauthorized to access resource');
};
