angular.module('appoints.authevents', ['http-auth-interceptor'])
  .run(['$rootScope', '$location', 'usersession', function ($rootScope, $location, usersession) {
    
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
      if (current.$route) {
        var auth = current.$route.auth;
        if (auth && ! usersession.current().isAuthenticated) {
          $rootScope.$broadcast('event:auth-loginRequired')
        }
      }
    });

    $rootScope.$on('event:auth-loginRequired', function(sender) {
      usersession.current().nextUrl = $location.url();
      $location.url('/login');
    });

    $rootScope.$on('event:auth-loginConfirmed', function(sender) {
      var nextUrl = usersession.current().nextUrl || '/';
      $location.url(nextUrl);
    });

  }]);