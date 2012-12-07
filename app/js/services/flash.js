appointsApp.factory('flash', ['$rootScope', function ($rootScope) {
  var flashes = [];

  return {

    add: function (message, level) {
      // default value for the level parameter
      level = level || 'info';

      var flash = {
        message: message,
        level: level
      };
      flashes.push(flash);

      // tell child scope that this flash has been added
      $rootScope.$broadcast('flash.add', flash);
    },

    /**
     * all returns all flashes, but does **not** clear them
     * @return {Array}
     */
    all: function () {
      return flashes;
    },

    /**
     * clear removes all flashes
     */
    clear: function () {
      $rootScope.$broadcast('flash.clear', true);
      flashes = [];
    },

    /**
     * getAll returns all flashes and clears them
     *
     * @return {Array}
     */
    getAll: function () {
      $rootScope.$broadcast('flash.remove');
      var f = angular.copy(flashes);
      flashes = [];
      return f;
    }
  };
}]);