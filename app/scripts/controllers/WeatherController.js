'use strict';

var app = angular.module('weatherApp.controller', []);

//currentWeatherController
app.controller('currentWeatherController',

    function currentWeatherController($scope, currentWeatherAppData) {

        $scope.searchCurrentWeatherByCity = function (city) {
            currentWeatherAppData.getCurrentWeatherData(city).then(function (res) {
                $scope.weatherData = res;
                $scope.weatherDate = res.dt * 1000; //receiving unix timestamp in seconds, convert to miliseconds
                $scope.weatherIcon = $scope.weatherData.weather[0].icon;
                $scope.weatherDescription = $scope.weatherData.weather[0].description;
            });
        };

    });

//sixteenDayWeatherController
app.controller('sixteenDayWeatherController',

    function sixteenDayWeatherController($scope, sixteenDayWeatherAppData) {

        $scope.searchWeatherByCity = function (city) {
            sixteenDayWeatherAppData.getWeatherData(city).then(function (res) {
                $scope.cod = res.cod;
                $scope.weatherData = res.list;
            });
        };

    });


//currentWeatherbyCoordController
app.controller('currentWeatherbyCoordController',

    function currentWeatherbyCoordController($scope, currentWeatherbyCoordAppData) {
        //Get location
        var getCurrentLoc = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    $scope.position = position;
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    
                    //Once we gave the location, use service to get the data
                    currentWeatherbyCoordAppData.getCurrentWeatherbyCoordData(lat, lon).then(function (res) {
                        $scope.weatherData = res;
                        $scope.weatherDate = res.dt * 1000; //receiving unix timestamp in seconds, convert to miliseconds
                        //console.log($scope.weatherData);
                        $scope.weatherIcon = $scope.weatherData.weather[0].icon;
                        $scope.weatherDescription = $scope.weatherData.weather[0].description;
                    });

                });
            });
        }

        getCurrentLoc();

        $scope.doRefresh = function () {
            getCurrentLoc();
            $scope.$broadcast('scroll.refreshComplete');
        }

    }); // End currentWeatherbyCoordController