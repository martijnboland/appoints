appointsApp.controller('AccountController', 
  ['$scope', '$location', function AccountController($scope, $location) {

  $scope.login = function (userdata, returnUrl) {

    $location.url(returnUrl || '/');
  }

  $scope.register = function (userdata) {

    $location.url('/');
  }
}]);