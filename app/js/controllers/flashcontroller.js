appointsApp.controller('FlashController', ['$scope', 'flash', function FlashController($scope, flash) {
  $scope.flashMessages = [];

  $scope.getMessageClass = function(level) {
    return 'alert alert-' + level;
  }

  $scope.$on('event:flash.add', function() {
    $scope.flashMessages = flash.getAll();
  });

  $scope.$on('event:flash.clear', function() {
    $scope.flashMessages = [];
  });

}]);