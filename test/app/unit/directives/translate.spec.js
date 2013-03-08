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
    
    it('should replace the inner text of the element with the translation with the inner text as key', function () {
      var elm = compile( '<div translate>test.key.1</div>' )( scope );
      expect(elm.text()).toBe('translation1');
    });

    it('should replace the inner text of the element with the translation with the attribute as key', function () {
      var elm = compile( '<div translate="test.key.1">original text</div>' )( scope );
      expect(elm.text()).toBe('translation1');
    });    

    it('should replace the inner text of the element with the attribute key when this was set but no translation was found', function () {
      var elm = compile( '<div translate="test.key.notfound">original text</div>' )( scope );
      expect(elm.text()).toBe('test.key.notfound');
    });   

    it('should prefer the attribute key over the inner text key when both can be resolved', function () {
      var elm = compile( '<div translate="test.key.2">test.key.1</div>' )( scope );
      expect(elm.text()).toBe('translation2');
    });  

  });

  describe('translateAttr', function() {
    
    it('should replace the value of the attribute with the translation with the original value of the attribute as key', function () {
      var elm = compile( '<input type="submit" translate-attr="value" value="test.key.1" />' )( scope );
      expect(elm.attr('value')).toBe('translation1');
    });

    it('should replace the value of the attribute with the original value of the attribute when not found', function () {
      var elm = compile( '<input type="submit" translate-attr="value" value="test.key.unknown" />' )( scope );
      expect(elm.attr('value')).toBe('test.key.unknown');
    });    

    it('should be able to translate multiple attributes', function() {
      var elm = compile( '<input type="submit" title="test.key.1" value="test.key.2" translate-attr="title, value"  />' )( scope );
      expect(elm.attr('title')).toBe('translation1');
      expect(elm.attr('value')).toBe('translation2');
    });
  });

});