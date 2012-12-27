var middleware = require('../routes/middleware');
var index = require('../routes/index');
var account = require('../routes/api/account');
var appointments = require('../routes/api/appointments');
var passport = require('passport');

module.exports = function(app) {

  // Index
  app.get('/', index.index);

  // Authentication and sign up
  app.post('/api/account/login', passport.authenticate('local'), account.login);
  app.post('/api/account', account.create);
  app.get('/api/account/me', account.me);
  app.get('/api/account/logout', middleware.ensureAuthenticated, account.logout);
  app.get('/api/account/confirm/:id', account.confirm);

  // Apointments
  app.get('/api/appointments', middleware.ensureAuthenticated, appointments.list);

  // Catch all route -- If a request makes it this far, it will be passed to angular.
  // This allows for html5mode to be set to true. E.g.
  // 1. Request '/signup'
  // 2. Not found on server.
  // 3. Redirected to '/#/signup'
  // 4. Caught by the '/' handler passed to Angular
  // 5. Angular will check for '#/signup' against it's routes.
  // 6. If found
  //    a. Browser supports history api -- change the url to '/signup'.
  //    b. Browser does not support history api -- keep the url '/#/signup'
  app.use(function (req, res) {
    res.redirect('/#' + req.path);
  });

}

