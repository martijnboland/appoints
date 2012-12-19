
appointsApp.factory('usersession', ['$rootScope', '$http', '$route', 'authService', function ($rootScope, $http, $route, authService) {

  var defaultSession = {
    userId: '',
    name: '',
    isAuthenticated: false,
    isAdmin: false,
    nextUrl: ''
  };

  function Session() {
    // always start with a default instance.
    return angular.copy(defaultSession, this);
  }

  var currentSession = new Session();

  function refreshCurrent(callback, error) {
    $http.get('/api/account/me')
      .success(function(result) {
        if (result.isAuthenticated) {
          currentSession.userId = result.userId;
          currentSession.name = result.name;
          currentSession.isAuthenticated = true;
        }
        else {
          currentSession.userId = '';
          currentSession.name = '';
          currentSession.isAuthenticated = false;
        }
        $rootScope.$broadcast('event:currentSessionChanged', currentSession);
        if (callback !== undefined) {
          callback();          
        }
      })
      .error(function(err) {
        console.log(err);
    });
  }

  function current() {
    refreshCurrent();
    return currentSession;
  }

  function login(loginData) {
    var promise = $http.post('/api/account/login', loginData);
    promise.then(function (result) {
      // Authentication was successful. Get the user data.
      refreshCurrent(function() {
        authService.loginConfirmed();
      });
      return result;
    });
    return promise;
  }

  function logout(callback) {
    $http.get('/api/account/logout').success(function (data) {
      currentSession = new Session();
      $rootScope.$broadcast('event:currentSessionChanged', currentSession);
      callback(currentSession);
    });
  }

  return {
    current: current,
    login: login,
    logout: logout
  };
}]);