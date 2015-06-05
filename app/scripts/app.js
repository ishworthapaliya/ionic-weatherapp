// Ionic weather App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'weather' is the name of this angular module example (also set in a <body> attribute in index.html)

angular.module('weatherApp', ['ionic', 'ngResource', 'weatherApp.weatherData','weatherApp.controller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('BASEURL', 'http://api.openweathermap.org/data/2.5/')



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: ''
  })
  
    .state('app.coord', {
    url: "/coord",
    views: {
      'menuContent': {
        templateUrl: "templates/currentWeatherbyCoord.html",
        controller: 'currentWeatherbyCoordController'
      }
    }
  })

  .state('app.current', {
    url: "/current",
    views: {
      'menuContent': {
        templateUrl: "templates/currentWeather.html",
        controller: 'currentWeatherController'
      }
    }
  })

  .state('app.sixteenday', {
    url: "/sixteenday",
    views: {
      'menuContent': {
        templateUrl: "templates/sixteenDayWeather.html",
        controller: 'sixteenDayWeatherController'
      }
    }
  });
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/coord');
});
