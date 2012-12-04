appointsApp.controller('AccountController', 
  ['$scope', '$location', '$http', function AccountController($scope, $location, $http) {

  $scope.login = function (userdata, returnUrl) {

    $location.url(returnUrl || '/');
  }

  $scope.register = function (userdata) {
    $http.post('/api/account', userdata)
      .success(function(data) {
        $location.url('/');   
      });
  }
}]);