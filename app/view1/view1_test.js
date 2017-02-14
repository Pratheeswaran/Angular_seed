'use strict';
var mock, Load_document;
var view1Ctrl;

describe('myApp.view1 module', function () {

    beforeEach(module('myApp.view1'));
    beforeEach(function() {
        inject(function($injector) {
            Load_document = $injector.get('Load_document');
        })
        });
    beforeEach(inject(function ($rootScope, $controller, c3SimpleService, $timeout, Load_document) {
        var scope = $rootScope.$new();
        view1Ctrl = $controller('View1Ctrl', {
            $scope: scope,
        });
    }));

    describe('view1 controller', function () {
        it('should ....', inject(function () {
            expect(view1Ctrl).toBeDefined();
        }));

    });
});