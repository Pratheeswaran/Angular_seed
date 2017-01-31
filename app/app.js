'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version', 'ngMaterial'
])
    .config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.generateThemesOnDemand(true);
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
            // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
             '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });

        $mdThemingProvider.theme('primary')
         .primaryPalette('blue')
          .accentPalette('yellow');
        $mdThemingProvider.setDefaultTheme('primary');
        //themes are still defined in config, but the css is not generated
        $mdThemingProvider.theme('altTheme')
          .primaryPalette('amazingPaletteName')

    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
    }).dark();;

        $routeProvider.otherwise({ redirectTo: '/view1' });
    }])
    .controller('AppCtrl', AppCtrl)
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
          .then(function () {
              $log.debug("close LEFT is done");
          });

    }
})
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
              $log.debug("close RIGHT is done");
          });
    };
})
 .directive('mdJustified', function () {
     return {
         restrict: 'A',
         compile: function (element, attrs) {
             var layoutDirection = 'layout-' + (attrs.mdJustified || "row");

             element.removeAttr('md-justified');
             element.addClass(layoutDirection);
             element.addClass("layout-align-space-between-stretch");

             return angular.noop;
         }
     };
 })
 .directive('themePreview', function () {
     return {
         restrict: 'E',
         templateUrl: 'app/colorpicker.tmpl.html',
         scope: {
             primary: '=',
             accent: '='
         },
         controller: function ($scope, $mdColors, $mdColorUtil) {
             $scope.getColor = function (color) {
                 return $mdColorUtil.rgbaToHex($mdColors.getThemeColor(color))
             };
         }
     }
 });

function AppCtrl($scope, $location, $timeout, $mdSidenav, $log, $mdTheming, $mdColorPalette, $mdColors, $mdColorUtil) {
    $scope.primary = 'purple';
    $scope.accent = 'green';
    $scope.colors = Object.keys($mdColorPalette);
    $scope.isPinned = false;
    $scope.lock = function () {
        $timeout(function () {
            $mdSidenav('left').close()
            $scope.isPinned = !$scope.isPinned;
            $mdSidenav('left').open();
            if ($scope.isPinned)
                $scope.myStyle = { width: '80px' };
            else
                $scope.myStyle = { width: '100%' };
        }, 200);

    }
    $scope.getColor = function (color) {
        return $mdColorUtil.rgbaToHex($mdColors.getThemeColor(color))
    };
    $scope.selectThemePrimary = function (color) {
            $scope.primary = color;
    };
    $scope.selectThemeAccent = function (color) {
            $scope.accent = color;
    };
    $mdTheming.generateTheme('altTheme');
    $mdTheming.generateTheme('primary');
    var route = $location.path().split("/")[1] || null;
    if (route)
        $scope.currentNavItem = route;
    else
        $scope.currentNavItem = 'view1';

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };
    $scope.Link = function (path) {
        $location.path(path);
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  $log.debug("toggle " + navID + " is done");
              });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  $log.debug("toggle " + navID + " is done");
              });
        }
    }
}
