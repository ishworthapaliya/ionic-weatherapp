'use strict';

var services = angular.module('weatherApp.weatherData', ['ngResource']);

services.factory('currentWeatherAppData', function($resource, $q, BASEURL){
	
	var resource = $resource(BASEURL + 'weather?q=:city&units=metric', {city:'@city'});
		return {
			getCurrentWeatherData: function(city){
				var deferred = $q.defer();
				
				resource.get({city:city},
					function (data){
					deferred.resolve(data);
				},
				function(response){
					deferred.reject(response);
				});
				
				return deferred.promise;
			}
			
		};

});

services.factory('sixteenDayWeatherAppData', function($resource, $q, BASEURL){

	var resource = $resource(BASEURL + 'forecast/daily?q=:city&mode=json&units=metric&cnt=16', {city:'@city'});
		return {
			getWeatherData: function(city){
				var deferred = $q.defer();
				
				resource.get({city:city},
					function (data){
					deferred.resolve(data);
				},
				function(response){
					deferred.reject(response);
				});
				
				return deferred.promise;
			}
			
		};

});

services.factory('currentWeatherbyCoordAppData', function($resource, $q, BASEURL){
	
	var resource = $resource(BASEURL + 'weather?lat=:lat&lon=:lon&units=metric');
		return {
			getCurrentWeatherbyCoordData: function(lat, lon){
				var deferred = $q.defer();
				
				resource.get({lat:lat, lon:lon},function (data){
					deferred.resolve(data);
				},
				function(response){
					deferred.reject(response);
				});
				
				return deferred.promise;
			}
			
		};

});

