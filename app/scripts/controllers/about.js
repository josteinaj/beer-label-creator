'use strict';

/**
 * @ngdoc function
 * @name beerLabelCreatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beerLabelCreatorApp
 */
angular.module('beerLabelCreatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
