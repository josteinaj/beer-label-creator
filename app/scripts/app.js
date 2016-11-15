'use strict';

/**
 * @ngdoc overview
 * @name beerLabelCreatorApp
 * @description
 * # beerLabelCreatorApp
 *
 * Main module of the application.
 */
angular
  .module('beerLabelCreatorApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

WebFont.load({
  google: {
    families: [
      'Fjord One',
      'Open Sans', 'Open Sans Condensed',
      'Lobster', 'Lobster Two',
      'Droid Sans', 'Droid Serif',
      'PT Sans', 'PT Sans Caption', 'PT Sans Narrow',
      'Lato'
    ]
  }
});
