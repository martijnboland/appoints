
appointsApp.factory('usersession', ['$rootScope', '$http', '$route', 'authService', 'flash', function ($rootScope, $http, $route, authService, flash) {

  var defaultSession = {
    userId: '',
    name: '',
    isAuthenticated: false,
    nextUrl: '',
    roles: [],
    isInRole: function(roleName) {
      if (this.isAuthenticated) {
        for (var i = 0; i < this.roles.length; i++) {
          if (this.roles[i] === roleName) {
            return true;
          }
        }      
      }
      return false;
    },
    isAdmin: function() { 
      return this.isInRole('admin');
    },
    isCustomer: function() {
      return this.isInRole('customer');
    }
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
          currentSession.roles = result.roles;
        }
        else {
          currentSession.userId = '';
          currentSession.name = '';
          currentSession.isAuthenticated = false;
          currentSession.roles = [];
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
    if (! currentSession.isAuthenticated) {
      refreshCurrent();
    }
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
    },
    function (result) {
      // Error
      flash.add('login.error', 'error');
      return $q.reject(result);
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