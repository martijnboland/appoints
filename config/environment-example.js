var settings = {
  connectionString: 'not configured',
  emailSettings: {
    from: 'no-reply@localhost',
    nodemailerTransportOptions: {
      host: 'localhost'
    }
  },
  authProviders: {},
  defaultLanguage: 'en-US'
}

exports.settings = settings;

exports.configure = function(app, express) {

  app.configure('development', function(){
    console.log('Configuring development environment');
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
    app.locals.pretty = true;
    settings.connectionString = 'mongodb://localhost/appoints';
    settings.authProviders = {
      facebook: { clientId: 'your id here', clientSecret: 'your secret here', callbackUrl: 'http://localhost:3000/auth/facebook/callback' },
      twitter: { consumerKey: 'your key here', consumerSecret: 'your secret here', callbackUrl: 'http://127.0.0.1:3000/auth/twitter/callback' },
      google: { consumerKey: 'your key here', consumerSecret: 'your secret here', callbackUrl: 'http://localhost:3000/auth/google/callback' }
    };
  });

  app.configure('production', function(){
    console.log('Configuring production environment');
    settings.connectionString = 'mongodb://localhost/appoints';
  });
}