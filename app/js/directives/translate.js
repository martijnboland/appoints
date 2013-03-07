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

appointsApp.directive('translateAttr', ['i18n', function(i18n) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var attrToTranslate = attrs.translateAttr;
      if (attrToTranslate !== '') {
        var attributes = attrToTranslate.replace(/\s+/g, '').split(',');
        for (var i = 0; i < attributes.length; i++) {
          var key = element.attr(attributes[i]);
          element.attr(attributes[i], i18n.t(key));
        }
      }
    }
  }
}]);