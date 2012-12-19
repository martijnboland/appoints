appointsApp.controller('AppointmentsController', 
  ['$scope', '$location', '$http', 'flash', 'usersession', function AppointmentsController($scope, $location, $http, flash, usersession) {

  var appointments = {};

  $http.get('/api/appointments')
    .success(function(data) {
      $scope.appointments = data;
    });

}]);