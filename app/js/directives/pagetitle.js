appointsApp.directive('pagetitle', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      $rootScope.pageTitle = element.text();
      scope.$watch('text', function (pageTitle) {
        $rootScope.pageTitle = pageTitle;
      });
    }
  }
}]);