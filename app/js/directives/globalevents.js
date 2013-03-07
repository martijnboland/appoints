appointsApp.directive('globalevents', ['flash', function(flash) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function(e){
        // Clear flash messages when the user clicks anywhere in the element where this directive is applied to.
        flash.clear();
      })
    }
  }
}]);