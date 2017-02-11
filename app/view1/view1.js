// using C3 (be sure to include it before, same with D3, which C3 requires)
'use strict';

// module definition, this has to be included in your app
angular.module('angular-c3-simple', [])

// service definition, if you want to use itm you have to include it in controller
// this service allows you to access every chart by it's ID and thanks to this,
// you can perform any API call available in C3.js http://c3js.org/examples.html#api
.service('c3SimpleService', [function () {
    return {};
}])

// directive definition, if you want to use itm you have to include it in controller
.directive('c3Simple', ['c3SimpleService', '$timeout', function (c3SimpleService, $timeout) {
    return {
        // this directive can be used as an Elemenst or an Attribute
        restrict: 'EA',
        scope: {
            // setting config attribute to isolated scope
            // config object is 1:1 configuration C3.js object, for avaiable options see: http://c3js.org/examples.html
            config: '='
        },
        template: '<div></div>',
        replace: true,
        controller: ['$scope', '$element', function ($scope, $element) {
            // Wait until id is set before binding chart to this id
            $scope.$watch($element, function () {

                if ('' === $element[0].id) {
                    return;
                }
                // binding chart to element with provided ID
                $scope.config.bindto = '#' + $element[0].id;

                //Generating the chart on every data change
                $scope.$watch('config', function (newConfig, oldConfig) {
                    if (c3SimpleService[$scope.config.bindto])
                        c3SimpleService[$scope.config.bindto].destroy();


                    // adding (or overwriting) chart to service c3SimpleService
                    // we are regenerating chart on each change - this might seem slow and unefficient
                    // but works pretty well and allows us to have more controll
                    $timeout(function () {
                        c3SimpleService[$scope.config.bindto] = c3.generate(newConfig);
                        setTimeout(function () {
                            c3SimpleService[$scope.config.bindto].load(newConfig.data);
                        }, 10500);

                        if (!newConfig.size) {
                            c3SimpleService[$scope.config.bindto].resize();
                        }

                    });
                    // if there is no size specified, we are assuming, that chart will have width
                    // of its container (proportional of course) - great for responsive design

                    // only updating data (enables i.e. animations)
                    $scope.$watch('config.data', function (newData, oldData) {
                        if ($scope.config.bindto) {
                            $timeout(function () {
                                c3SimpleService[$scope.config.bindto].load(newData);
                            });
                        }
                    }, true);
                }, true);
            });
        }]
    };
}]);



'use strict';
angular.module('myApp.view1', ['ngRoute', 'angular-c3-simple'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        //use  templateUrl: 'view2/view2.html', in local
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Ctrl'
    });
}])
.controller('View1Ctrl', ['$scope', 'c3SimpleService', '$timeout', 'Load_document', '$rootScope', function ($scope, c3SimpleService, $timeout, Load_document, $rootScope,  $element) {
    Load_document.Start($rootScope);
    $scope.Traffic = {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            types: {
                data1: 'area-spline',
                data2: 'area-spline'
            }

        },
        color: {

            pattern: ['#ffffff', '#aec7e8']
        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    }
    $scope.Projects = [
        { Name: "Web service", Language: "C++", Status: "Active" },
        { Name: "Mobile appication", Language: "java", Status: "Completed" },
        { Name: "Sales Forecasting", Language: "Python", Status: "Idle" },
        { Name: "Company site", Language: "C#", Status: "Completed" },
        { Name: "Company blog", Language: "Java script", Status: "Bugs posted" }
    ];
    $scope.Issues = [
      { Name: "Browser issues", id: "5463",progress:30 },
      { Name: "Alignment issues in chat box", id: "3245", progress: 55 },
      { Name: "Dynamic data updating issues", id: "7653", progress: 22 },
      { Name: "Home button", Language: "C#", id: "2123", progress: 87 }
    ];

    $scope.Growth = {
        data: {
            columns: [
                ['data1', 30, 20, 10, 40, 15, 25, 13, 10, 14, 20, 26],
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }

            // or
            //width: 100 // this makes bar width 100px
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Commits = {
        data: {
            columns: [
                ['data1', 30, 20, 10, 40, 15, 25, 13, 10, 14, 20, 26],
            ],
            type: 'spline'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Clients = {
        data: {
            columns: [
                ['data1', 50, -30, 40, -20, 30, -25, 33, -50, -40, 20, 46],
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Invoice = {
        data: {
            columns: [
                ['data1', 40, 20, 14, 30, 20, 25, 26, 10, 40, 20, 25],
                ['data2', 30, 40, 10, 40, 15, 25, 15, 10, 14, 20, 26]
            ],
            types: {
                data1: 'spline',
                data2: 'bar',
            },
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };

    $scope.chart = {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
            ]
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        }
    };
    $scope.Donut = {
        data: {
            columns: [
                ['vinoth', 30],
                ['vivek', 120],
                ['arun', 120]
            ],
            type: 'donut',
            onclick: function (d, i) { },
            onmouseover: function (d, i) {; },
            onmouseout: function (d, i) { }
        },

        donut: {
            width: 50,
        },
        tooltip: {
            contents: function (d) { return '<img class="md-user-avatar" src="app/assets/' + d[0].id + '.jpg"  md-whiteframe="20">' },
        }
    }
    $scope.Change = true;
    $scope.Tasks = [
        { Name: "New reports addition", Time: "Monday", Done: false, on: "Web API",color:"green" },
        { Name: "Issues to be solved", Time: "Friday", Done: false, on: "Web API", color: "purple" },
        { Name: "Notifications alerts", Time: "later", Done: false, on: "Mobile API", color: "teal" },
        { Name: "Change the Design", Time: "Today", Done: true, on: "Mobile API", color: "red" }
    ]
    $timeout(function () { Load_document.Stop($rootScope); }, 1500)

}]);
