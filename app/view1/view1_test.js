'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));
  var view1Ctrl
  beforeEach(inject(function ($rootScope, $controller, c3SimpleService, $timeout, Load_document) {
      var scope = $rootScope.$new();
       view1Ctrl = $controller('View1Ctrl', {
          $scope: scope,
      });
  }));

  describe('view1 controller', function(){
      it('should ....', inject(function () {
      expect(view1Ctrl).toBeDefined();
    }));

  });
});