appointsApp.controller('AccountController', 
  ['$scope', '$location', '$http', 'flash', function AccountController($scope, $location, $http, flash) {

  $scope.login = function (userdata, returnUrl) {
    $http.post('/api/account/login', userdata)
      .success(function(data) {
        $location.url(returnUrl || '/');
      })
  }

  $scope.register = function (userdata) {
    $http.post('/api/account', userdata)
      .success(function(data) {
        flash.add('You have registered successfully', 'success');
        $location.url('/');   
      });
  }
}]);