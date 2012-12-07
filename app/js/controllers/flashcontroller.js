appointsApp.controller('FlashController', ['$scope', 'flash', function FlashController($scope, flash) {
  $scope.flashMessages = [];

  $scope.getMessageClass = function(level) {
    return 'alert alert-' + level;
  }

  $scope.$on('flash.add', function() {
    $scope.flashMessages = flash.getAll();
  });

  $scope.$on('flash.clear', function() {
    $scope.flashMessages = [];
  });

  $scope.$on('$routeChangeSuccess', function (scope, next, current) {
    $scope.flashMessages = [];
  });

}]);