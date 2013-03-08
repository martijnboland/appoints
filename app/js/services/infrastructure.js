angular.module('appoints.infrastructure', [])
  
  .config(['$provide', '$httpProvider', function($provide, $httpProvider) {
    $provide.factory('errorInterceptor', ['$q', '$window', '$rootScope', 'flash', function ($q, $window, $rootScope, flash) {
      return function (promise) {
        return promise.then(function (response) {
          // Success
          return response;
        }, function (response) {
          // Error
          // Is it a Mongoose validation error? If so, populate flash messages and continue
          if (response.data.name === 'ValidationError') {
            angular.forEach(response.data.errors, function(error) {
              flash.add(error.message, 'error');
            });
          }
          else if (response.status === 401) {
            console.log(response);
          }
          else {
            console.log(response.data)
            flash.add('error.unknown', 'error');
          }
          return $q.reject(response);
        });
      };
    }]);
    $httpProvider.responseInterceptors.push('errorInterceptor');

  }]);
