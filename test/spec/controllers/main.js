'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('beerLabelCreatorApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of colors to the scope', function () {
    expect(scope.form.colors.length).toBe(5);
  });*/
  
  it('camelCase should make a string camel case\'d', function () {
    expect(scope.camelCase('Brewing beer is fun')).toBe('brewingBeerIsFun');
  });
});
