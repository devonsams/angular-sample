'use strict';

angular.module('angular.sample', [
  'ngMaterial',
  'ui.router',
  'templates',
  'LocalStorageModule',
  'mdColorPicker'
])

/*@ngInject*/
.config(function ($urlRouterProvider, $locationProvider, $httpProvider, $stateProvider, localStorageServiceProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/');
  localStorageServiceProvider.setPrefix('demoPrefix');
});
