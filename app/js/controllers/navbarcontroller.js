
appointsApp.controller('NavbarController', ['$scope', '$location', function NavbarController($scope, $location) {

  $scope.appName = 'Taiga';
  
  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

}]);