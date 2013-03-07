/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , env = require('./config/environment')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , i18n = require('i18next');

var app = express();

env.configure(app, express);

require('./config/passport')();

i18n.init({ 
  fallbackLng: env.settings.defaultLanguage, 
  ignoreRoutes: ['img/', 'partials/', 'css/', 'js/'],
  resGetPath: 'locales/__lng__/__ns__.json'
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(require('connect-assets')({ src: 'app' }));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser('raahhh raahhh'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(i18n.handle);
  app.use(app.router);
});

i18n.registerAppHelper(app);
i18n.serveDynamicResources(app);

require('./config/routes')(app);

mongoose.connect(env.settings.connectionString);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
