appointsApp.directive('translate', ['i18n', function(i18n) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      var key = attrs.translate;
      if (key === '') {
        key = element.text();
      }
      scope.text = i18n.t(key);
      element.text(scope.text);
    }
  }
}]);