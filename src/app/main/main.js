'use strict';

angular.module('angular.sample')
  .config(($stateProvider) => {
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        template: '<main flex layout="column"></main>'
      });
  });
