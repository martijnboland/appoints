describe('i18n-directive', function() {
  
  var compile, scope;

  beforeEach(module(function($provide){
    var i18n = {
      t: function(key, options) {
        switch(key) {
          case 'test.key.1':
            return 'translation1';
          case 'test.key.2':
            return 'translation2';
        }
        return key;
      }
    };
    $provide.value('i18n', i18n);
  }));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    compile = $compile;
  }));

  describe('translate', function() {
    
    it('should replace the inner text of the element with the translation with the inner text as key', inject(function () {
      var elm = compile( '<div translate>test.key.1</div>' )( scope );
      expect(elm.text()).toBe('translation1')
    }));

    it('should replace the inner text of the element with the translation with the attribute as key', inject(function () {
      var elm = compile( '<div translate="test.key.1">original text</div>' )( scope );
      expect(elm.text()).toBe('translation1')
    }));    

    it('should replace the inner text of the element with the attribute key when this was set but no translation was found', inject(function () {
      var elm = compile( '<div translate="test.key.notfound">original text</div>' )( scope );
      expect(elm.text()).toBe('test.key.notfound')
    }));   

    it('should prefer the attribute key over the inner text key when both can be resolved', inject(function () {
      var elm = compile( '<div translate="test.key.2">test.key.1</div>' )( scope );
      expect(elm.text()).toBe('translation2')
    }));    

  });

});