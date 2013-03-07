appointsApp.directive('translate', ['i18n', function(i18n) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var key = attrs.translate;
      if (key === '') {
        key = element.text();
      }
      element.text(i18n.t(key));
    }
  }
}]);