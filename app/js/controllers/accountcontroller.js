appointsApp.controller('AccountController', 
  ['$scope', '$location', '$http', 'flash', function AccountController($scope, $location, $http, flash) {

  $scope.login = function (userdata, returnUrl) {

    $location.url(returnUrl || '/');
  }

  $scope.register = function (userdata) {
    $http.post('/api/account', userdata)
      .success(function(data) {
        $location.url('/');   
      })
      .error(function(data) {
        flash.add(data, 'error');
      });
  }
}]);