
appointsApp.controller('NavbarController', ['$scope', '$location', function NavbarController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

}]);