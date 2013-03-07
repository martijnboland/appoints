
appointsApp.controller('NavbarController', ['$scope', '$location', 'usersession', 'flash', function NavbarController($scope, $location, usersession, flash) {

  $scope.user = usersession.current();

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

  $scope.logout = function() {
    usersession.logout(function() {
      flash.add('Logged out successfully', 'success');
      $location.url('/');
    });
  }

  $scope.$on('event:currentSessionChanged', function(ev, currentSession) {
    $scope.user = currentSession;
  })

}]);