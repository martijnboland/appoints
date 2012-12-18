
appointsApp.factory('usersession', ['$rootScope', '$http', 'authService', function ($rootScope, $http, authService) {

  var defaultSession = {
    userId: '',
    name: '',
    isAuthenticated: false,
    isAdmin: false
  };

  function Session() {
    // always start with a default instance.
    return angular.copy(defaultSession, this);
  }

  var currentSession = new Session();

  function refreshCurrent() {
    $http.get('/api/account/me')
      .success(function(result) {
        if (result.isAuthenticated === "true") {
          currentSession.userId = result.userId;
          currentSession.name = result.name;
          currentSession.isAuthenticated = true;
        }
        else {
          currentSession = new Session();
        }
        $rootScope.$broadcast('event:currentSessionChanged', currentSession);
      })
      .error(function(err) {
      // return the default session in case something fails.
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
      authService.loginConfirmed();
      refreshCurrent();
      return result;
    });
    return promise;
  }

  function logout(callback) {
    $http.get('/api/account/logout').success(function (data) {
      currentSession = new Session();
      $rootScope.$broadcast('event:currentSessionChanged', currentSession);
      callback();
    });
  }

  return {
    current: current,
    login: login,
    logout: logout
  };
}]);