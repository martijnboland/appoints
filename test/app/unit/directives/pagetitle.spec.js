describe('pagetitle-directive', function() {
  
  var compile, scope;

  beforeEach(module(function($provide){
    var i18n = {
      t: function(key, options) {
        return 'TranslatedPageTitle';
      }
    };
    $provide.value('i18n', i18n);
  }));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    compile = $compile;
  }));

  describe('pagetitle', function() {
    
    it('should update the pageTitle variable in the rootScope with the value of the inner text.', function () {
      var elm = compile( '<div pagetitle>PageTitle</div>' )( scope );
      expect(scope.pageTitle).toBe('PageTitle');
    });

    it('should update the pageTitle variable in the rootScope with the translated value of the inner text.', function () {
      var elm = compile( '<div translate pagetitle>page.title</div>' )( scope );
      expect(scope.pageTitle).toBe('TranslatedPageTitle');
    });    

  });

});