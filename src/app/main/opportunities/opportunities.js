'use strict';

angular.module('angular.sample')
  .config(($stateProvider) => {
    $stateProvider
      .state('main.opportunities', {
        url: '',
        template: '<opportunities flex layout="column"></opportunities>'
      });
  });
