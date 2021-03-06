'use strict';
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngMaterial',
  'gridshore.c3js.chart'])
.run(run)
.config(['$locationProvider', '$routeProvider', '$mdThemingProvider', config])
.filter('titleCase', titleCase)
.service('Load_document', ['$rootScope', function () {
    var service = {
        Start: Start,
        Stop: Stop
    };
    return service

    function Start($rootScope) {  $rootScope.Load_Document= true; }
    function Stop($rootScope) { $rootScope.Load_Document = false; }
}])
.directive('themePreview', themePreview)
.directive('scrollToBottom', scrollToBottom)
.directive("outsideClick", ['$document', '$parse', '$timeout', outsideClick])
.directive('spyStyle', ['$timeout', spyStyle])
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('AppCtrl', AppCtrl);




function config($locationProvider, $routeProvider, $mdThemingProvider) {
    $locationProvider.hashPrefix('!');
    $mdThemingProvider.alwaysWatchTheme(true);
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
       .primaryPalette('amazingPaletteName')
      .accentPalette('yellow');
    $mdThemingProvider.setDefaultTheme('primary');
    //themes are still defined in config, but the css is not generated
    $mdThemingProvider.theme('altTheme')
      .primaryPalette('blue')

// If you specify less than all of the keys, it will inherit from the
// default shades
.accentPalette('purple', {
    'default': '200' // use shade 200 for default, and keep all other shades the same
}).dark();
    $mdThemingProvider.theme('altTheme2')
             .primaryPalette('blue')

       // If you specify less than all of the keys, it will inherit from the
       // default shades
       .accentPalette('purple', {
           'default': '200' // use shade 200 for default, and keep all other shades the same
       });

    $routeProvider.otherwise({ redirectTo: '/view1' });
}

function run() {

}




function themePreview() {
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
}

function scrollToBottom($timeout, $window) {
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
}

function spyStyle($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return element.css(attrs['spyAttribute']);
            }, styleChangedCallBack,
            true);
            function styleChangedCallBack(newValue, oldValue) {
                if (newValue !== oldValue) {
                    var x = document.querySelectorAll(".md-toolbar_icon");
                    angular.forEach(x, function (item) {
                        $timeout(function () {
                            item.style.color = newValue;
                        }, 0);
                    });
                }
            }

        }
    };

}

function outsideClick($document, $parse, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {
            var onDocumentClick = function (event) {
                var offsetLeft = getOffsetLeft($element);
                var offsetTop = getOffsetTop($element);
                if (((event.target.id != $element[0].id && $parse($attributes.ngShow)($scope))) || event.target.id == $element[0].id + '_icon') {
                    //if (!((event.clientY > $element["0"].offsetTop && event.clientY < parseInt($element["0"].offsetTop + $element["0"].clientHeight)) || (event.clientX > parseInt($element["0"].offsetLeft + $element["0"].clientWidth))) || event.target.id == $element[0].id + '_icon') {
                    $timeout(function () {
                        if (!(event.clientY > offsetTop && event.clientY < parseInt(offsetTop + $element["0"].clientHeight)) || !(event.clientX > offsetLeft && event.clientX < parseInt(offsetLeft + $element["0"].clientWidth)) || event.target.id == $element[0].id + '_icon') {
                            $scope[$attributes.ngShow] = !$scope[$attributes.ngShow];
                            $scope.$apply();
                        }
                    }, 10)
                };
            }
            function getOffsetLeft(elem) {
                elem = elem[0];
                var offsetLeft = 0;
                do {
                    if (!isNaN(elem.offsetLeft)) {
                        offsetLeft += elem.offsetLeft;
                    }
                } while (elem = elem.offsetParent);
                return offsetLeft;
            }
            function getOffsetTop(elem) {
                elem = elem[0];
                var offsetTop = 0;
                do {
                    if (!isNaN(elem.offsetTop)) {
                        offsetTop += elem.offsetTop;
                    }
                } while (elem = elem.offsetParent);
                return offsetTop;
            }
            $document.on("click", onDocumentClick);
            if (_hasTouch()) {
                $document.on('touchstart', eventHandler);
            }
            $element.on('$destroy', function () {
                if (_hasTouch()) {
                    $document.off('touchstart', eventHandler);
                }
                $document.off("click", onDocumentClick);

            });
            function _hasTouch() {
                return 'ontouchstart' in window || navigator.maxTouchPoints;
            };
        }
    }
}


function titleCase() {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
}

function LeftCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
          .then(function () {
              $log.debug("close LEFT is done");
          });

    }
}

function RightCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
              $log.debug("close RIGHT is done");
          });
    };
}

AppCtrl.$inject = ['$scope', '$location', '$timeout', '$mdSidenav', '$log', '$mdTheming', '$mdColorPalette', '$mdColors', '$mdColorUtil', '$mdMedia', '$filter', '$anchorScroll', 'Load_document', '$rootScope'];
function AppCtrl($scope, $location, $timeout, $mdSidenav, $log, $mdTheming, $mdColorPalette, $mdColors, $mdColorUtil, $mdMedia, $filter, $anchorScroll, Load_document, $rootScope) {
  
    $scope.Show_Notification = false;
    $scope.Show_User_Profile = false;
    $scope.Show_Notification_Click = function () {
        $scope.Show_Notification = !$scope.Show_Notification;
    }
    $scope.Show_User_Profile_Click = function (ev) {
        $scope.Show_User_Profile = !$scope.Show_User_Profile;
    }
    $scope.Notification_Click = function (val) {
        $timeout(function () { $scope.Notifications[val].Seen = true; }, 200)

    }
    $scope.Events = [{ Name: "Arun opened a new issue ", Icon: "bug_report" },
       { Name: "Visual studio licence expires in 3 days", Icon: "warning" },
       { Name: "Ranjth Send you a voice mail for next conference", Icon: "voicemail" },
          { Name: "Backup all code in 6 days", Icon: "backup" },
       { Name: "Your Next flight for Canada will be on 15th August 2015.", Icon: "flight" }];

    $scope.Notifications = [{ Name: "Message form HR", Action: "Message", Seen: false, Icon: "textsms" },
        { Name: "Git commit", Action: "Task", Seen: false, Icon: "linear_scale" },
        { Name: "Message form TeamLead ", Action: "Message", Seen: false, Icon: "textsms" },
        { Name: "Finish the Messaging Module", Action: "Task", Seen: false, Icon: "code" }];
    $rootScope.user = { Name: "popeye", Online: true, img: "app/assets/popeye1.png" ,Phone:"000-10-00000000",Mail:"me@gmail.com"};
    $scope.people = [{ Name: "Vinoth", Online: true, img: "app/assets/vinoth.jpg" },
        { Name: "Arun", Online: false, img: "app/assets/arun.jpg", messages: [] },
        { Name: "Sampath", Online: true, img: "app/assets/sampath.jpg", messages: [] },
        { Name: "Mahesh", Online: false, img: "app/assets/mahesh.jpg", messages: [] },
        { Name: "Ranjth", Online: true, img: "app/assets/ranjth.jpg", messages: [] },
        { Name: "Mano", Online: true, img: "app/assets/mano.jpg", messages: [] },
        { Name: "Vivek", Online: false, img: "app/assets/vivek.jpg", messages: [] }];
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
        $scope.today = new Date();
        var diff = $filter('date')($scope.today - date, 'dd');
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
    $scope.primary = 'blue';
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
    $mdTheming.generateTheme('altTheme2');
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
