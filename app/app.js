'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version', 'ngMaterial', 'gridshore.c3js.chart'
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
    .controller('AppCtrl', AppCtrl).filter('titleCase', function () {
        return function (input) {
            input = input || '';
            return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        };
    })
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
 })
   .directive('scrollToBottom', function ($timeout, $window) {
       return {
           scope: {
               scrollToBottom: "="
           },
           restrict: 'A',
           link: function (scope, element, attr) {
               scope.$watchCollection('scrollToBottom', function (newVal) {
                   if (newVal) {
                       $timeout(function () {
                           element[0].scrollTop = element[0].scrollHeight + 10;
                       }, 0);
                   }
               });
           }
       };
   })
.directive("outsideClick", ['$document', function ($document) {
    return {
        link: function ($scope, $element, $attributes) {
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function (event) {
                        //console.log(event.target.parentNode.parentNode.parentNode.parentNode.id)
                    if (((event.target.id != 'Notification' && $scope.Show_Notification) && (event.target.parentNode.parentNode.parentNode.parentNode.id != 'Notification')) || event.target.id == 'Notification_icon') {
                        $scope.$apply(scopeExpression);
                    };
                }
            $document.on("click", onDocumentClick);
            $element.on('$destroy', function () {
                $document.off("click", onDocumentClick);
            });
        }
    }
}]);

function AppCtrl($scope, $location, $timeout, $mdSidenav, $log, $mdTheming, $mdColorPalette, $mdColors, $mdColorUtil, $mdMedia, $filter, $anchorScroll) {
    $scope.Show_Notification = false;
    $scope.Show_Notification_Click = function () {
        $scope.Show_Notification = !$scope.Show_Notification;
    }
    $scope.Notification_Click = function () {
    }
    $scope.Notifications = [{ Name:"Message form HR" ,Action:"Message",Seen:true},
        { Name: "Git commit", Action: "Task", Seen: false },
        { Name: "Message form TeamLead ", Action: "Message", Seen: true },
        { Name: "Finish the Messaging Module", Action: "Task", Seen: false }];
    $scope.user = { Name: "popeye", Online: true, img: "app/assets/popeye1.png" };
    $scope.people = [{ Name: "Vinoth", Online: true, img: "app/assets/0.jpg" },
        { Name: "Arun", Online: false, img: "app/assets/0.jpg", messages: [] },
        { Name: "Sampath", Online: true, img: "app/assets/0.jpg", messages: [] },
        { Name: "Mahesh", Online: false, img: "app/assets/0.jpg", messages: [] },
        { Name: "Ranjth", Online: true, img: "app/assets/0.jpg", messages: [] },
        { Name: "Mahesh", Online: true, img: "app/assets/0.jpg", messages: [] },
        { Name: "Vivek", Online: false, img: "app/assets/0.jpg", messages: [] }];
    angular.forEach($scope.people, function (item) {

        var messages = [{ msg: "Hai", Time: "12.30 PM", From: "me", Date: new Date("2017-01-27") },
          { msg: "Hai", Time: "12.44 PM", From: "him", Date: new Date("2017-01-31") },
          { msg: "How are you?", Time: "1.01 PM", From: "me", Date: new Date("2017-02-01") },
          { msg: "Pretty good", Time: "1.04 PM", From: "him", Date: new Date("2017-02-01") },
          { msg: "How about you?", Time: "1.11 PM", From: "him", Date: new Date("2017-02-02") },
          { msg: "Ya Fine", Time: "1.14 PM", From: "me", Date: new Date("2017-02-02") },
          { msg: "How is your work going?", Time: "1.15 PM", From: "me", Date: new Date("2017-02-03") },
          { msg: "Good.", Time: "1.19 PM", From: "him", Date: new Date("2017-02-03") }]
        item.messages = messages;
    });

    $scope.formatDate = function (date) {
        console.log(date)
        $scope.today = new Date();
        var diff = $filter('date')($scope.today - date, 'dd');
        console.log(diff)
        if (diff == 1) {
            $scope.PrevDate = "Today"
        }
        else if (diff == 2) {
            $scope.PrevDate = "Yesterday"
        }
        else if (diff > 2 && diff < 5) {
            $scope.PrevDate = $filter('date')(date, 'EEEE');
        }
        else {
            $scope.PrevDate = $filter('date')(date, 'fullDate');
        }
        if ($scope.retDate != $scope.PrevDate) {
            $scope.retDate = $scope.PrevDate;
            return $scope.PrevDate;
        }
        else {
            return null;
        }
    };
    $scope.primary = 'purple';
    $scope.accent = 'green';
    $scope.colors = Object.keys($mdColorPalette);
    $scope.isPinned = false;
    $scope.$watch(function () { return $mdMedia('xs'); }, function (bool) {
        $scope.screen = bool;
        if (bool)
            $scope.isPinned = false;
        else {
            $scope.isPinned = false;
            $scope.myStyle = { width: '100%' };
        }
    });
    console.log()
    $scope.lock = function () {
        $timeout(function () {
            $mdSidenav('left').close()
            $scope.isPinned = !$scope.isPinned;
            $mdSidenav('left').open();
            if ($scope.isPinned)
                $scope.myStyle = { width: '88px' };
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
    $scope.goToPerson = function (person, ev) {
        $scope.toggleRight2();
        //element[0].scrollTop = element[0].scrollHeight + 10;
        var elmnt = document.getElementById("chatBox");
        elmnt.scrollTop = 500;
        console.log(elmnt.scrollTop)
        $scope.Chat_Person = person;
    };
    $scope.Back_To_Chat = function () {
        $scope.toggleRight2();
    }
    $scope.Send_message = function (mesg) {
        if (mesg) {
            $scope.my_message = null;
            $scope.Chat_Person.messages.push({ msg: mesg, Time: $filter('date')(new Date(), 'hh.mm a'), From: "me", Date: new Date() });
        }
    }
    $scope.toggleRight2 = buildDelayedToggler('right2');
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
