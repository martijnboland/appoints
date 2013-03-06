angular.module('appoints.localization', [])
  
  .config(['$provide', '$localeProvider', function($provide, $localeProvider) {
    i18n.init({
      lng: $localeProvider.$get().id,
      fallbackLng: 'en',
      dynamicLoad: true,
      resGetPath: 'locales/resources.json?lng=__lng__&ns=__ns__'
    });

    $provide.factory('i18n', function() {
      return {
        t: function(key, options) {
          return i18n.translate(key, options);
        }
      }
    });
  }]);
