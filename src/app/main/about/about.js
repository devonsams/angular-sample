'use strict';

angular.module('angular.sample')
  .config(($stateProvider) => {
    $stateProvider
      .state('main.about', {
        url: 'about',
        template: '<about></about>'
      });
  });
