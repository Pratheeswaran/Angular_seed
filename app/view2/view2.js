'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        //use  templateUrl: 'view2/view2.html', in local
        templateUrl: 'Angular_seed/app/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);