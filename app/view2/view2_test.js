'use strict';

describe('myApp.view2 module', function () {
    beforeEach(module('myApp.view2'));

    describe('view2 controller', function () {

        var view2Ctrl
        beforeEach(inject(function ($rootScope, $controller,  $timeout) {
            var scope = $rootScope.$new();
            view2Ctrl = $controller('View2Ctrl', {
                $scope: scope,
            });
        }));

        it('should ....', inject(function ($controller) {
            expect(view2Ctrl).toBeDefined();
        }));

    });
});