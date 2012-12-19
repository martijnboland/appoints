appointsApp.controller('AccountController', 
  ['$scope', '$location', '$http', 'flash', 'usersession', function AccountController($scope, $location, $http, flash, usersession) {

  $scope.login = function (loginData) {
    usersession.login(loginData);
  }

  $scope.register = function (userData) {
    $http.post('/api/account', userData)
      .success(function(data) {
        flash.add('You have registered successfully.', 'success');
        $location.url('/');   
      });
  }
}]);