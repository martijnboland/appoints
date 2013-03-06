describe('NavbarController', function() {
  
  var testUser = {
    "isAuthenticated": true,
    "userId": "1234567890",
    "name": "Test User",
    "email": "test@user.org",
    "provider": "test"
  }

  var scope;

  beforeEach(inject(function($controller, $httpBackend, $rootScope) {

    $httpBackend.whenGET('/api/account/me').respond(testUser);
    $httpBackend.whenGET('/api/account/logout').respond('logged out successfully');
    $httpBackend.whenGET('/partials/home.html').respond('home');
    $controller('NavbarController', {$scope: scope = $rootScope});
    
    $httpBackend.flush();
  }));

  describe('routeIs', function() {
    
    it('should return true when the route matches', inject(function($location) {
      $location.url('/testurl')
      expect(scope.routeIs('/testurl')).toBeTruthy();
    }));

    it('should return false when the route doesn\'t match', inject(function($location) {
      $location.url('/testurl')
      expect(scope.routeIs('/otherurl')).toBeFalsy();
    }));

  });

  describe('logout', function() {
    
    it('should logout the current user and redirect to the root url', inject(function($location) {
      
      $location.path('foo');
      expect(scope.user.isAuthenticated).toBeTruthy();
      
      scope.logout(function () {
        expect(scope.user.isAuthenticated).toBeFalsy();
        expect(scope.user.name).toBe('');
        expect($location.path()).toBe('/');        
      });

    }));
  });  
});