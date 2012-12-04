/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , env = require('./config/environment')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('raahhh raahhh'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('connect-assets')({ src: 'app' }));
  app.use(express.static(path.join(__dirname, 'app')));
});

env.configure(app, express);

require('./config/routes')(app);

mongoose.connect(env.settings.connectionString);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
