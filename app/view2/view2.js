'use strict';
angular.module('myApp.view2', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        //use  templateUrl: 'view2/view2.html', in local
        templateUrl: 'app/view2/view2.html',
        controller: 'View2Ctrl'
    });
}]).run(run)
.directive('worldmap',function () {
       return {
           restrict: 'E',
           replace:true,
           template: '<div id="chartdiv"></div>',
           link: function (scope, element, attrs) {
               var chart = false;
               var initChart = function() {
                   if (chart) chart.destroy();
                   var config = scope.config || {};
                   chart = AmCharts.makeChart("chartdiv", {
                       "type": "map",
                       "theme": "light",
                       "projection": "miller",

                       "imagesSettings": {
                           "rollOverColor": "#089282",
                           "rollOverScale": 3,
                           "selectedScale": 3,
                           "selectedColor": "#089282",
                           "color": "#13564e"
                       },

                       "areasSettings": {
                           "unlistedAreasColor": "#15A892"
                       },

                       "dataProvider": {
                           "map": "worldLow",
                           "images": [{
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Brussels",
                               "latitude": 50.8371,
                               "longitude": 4.3676
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Copenhagen",
                               "latitude": 55.6763,
                               "longitude": 12.5681
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Paris",
                               "latitude": 48.8567,
                               "longitude": 2.3510
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Reykjavik",
                               "latitude": 64.1353,
                               "longitude": -21.8952
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Moscow",
                               "latitude": 55.7558,
                               "longitude": 37.6176
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Madrid",
                               "latitude": 40.4167,
                               "longitude": -3.7033
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "London",
                               "latitude": 51.5002,
                               "longitude": -0.1262
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Peking",
                               "latitude": 39.9056,
                               "longitude": 116.3958
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "New Delhi",
                               "latitude": 28.6353,
                               "longitude": 77.2250
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Tokyo",
                               "latitude": 35.6785,
                               "longitude": 139.6823
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Ankara",
                               "latitude": 39.9439,
                               "longitude": 32.8560
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Buenos Aires",
                               "latitude": -34.6118,
                               "longitude": -58.4173
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Brasilia",
                               "latitude": -15.7801,
                               "longitude": -47.9292
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Ottawa",
                               "latitude": 45.4235,
                               "longitude": -75.6979
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Washington",
                               "latitude": 38.8921,
                               "longitude": -77.0241
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Kinshasa",
                               "latitude": -4.3369,
                               "longitude": 15.3271
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Cairo",
                               "latitude": 30.0571,
                               "longitude": 31.2272
                           }, {
                               "zoomLevel": 5,
                               "scale": 0.5,
                               "title": "Pretoria",
                               "latitude": -25.7463,
                               "longitude": 28.1876
                           }]
                       }
                   });

               };
               initChart();
               chart.addListener("positionChanged", updateCustomMarkers);
               // this function will take current images on the map and create HTML elements for them
               function updateCustomMarkers(event) {
                   // get map object
                   var map = event.chart;

                   // go through all of the images
                   for (var x in map.dataProvider.images) {
                       // get MapImage object
                       var image = map.dataProvider.images[x];

                       // check if it has corresponding HTML element
                       if ('undefined' == typeof image.externalElement)
                           image.externalElement = createCustomMarker(image);

                       // reposition the element accoridng to coordinates
                       var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
                       image.externalElement.style.top = xy.y + 'px';
                       image.externalElement.style.left = xy.x + 'px';
                   }
               }
               // this function creates and returns a new marker element
               function createCustomMarker(image) {
                   // create holder
                   var holder = document.createElement('div');
                   holder.className = 'map-marker';
                   holder.title = image.title;
                   holder.style.position = 'absolute';

                   // maybe add a link to it?
                   if (undefined != image.url) {
                       holder.onclick = function () {
                           window.location.href = image.url;
                       };
                       holder.className += ' map-clickable';
                   }

                   // create dot
                   var dot = document.createElement('div');
                   dot.className = 'dot';
                   holder.appendChild(dot);

                   // create pulse
                   var pulse = document.createElement('div');
                   pulse.className = 'pulse';
                   holder.appendChild(pulse);

                   // append the marker to the map container
                   image.chart.chartDiv.appendChild(holder);

                   return holder;
               }
           }
       }
   })
.controller('View2Ctrl', ['$timeout', '$scope', function ($timeout, $scope) {
}]);

