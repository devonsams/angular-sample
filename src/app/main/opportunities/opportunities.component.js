'use strict';

angular
    .module('angular.sample')
    .directive('opportunities', opportunitiesComponent);

function opportunitiesComponent() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: Opportunities,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/opportunities/opportunities.html'
    };
}

class Opportunities {
  /*@ngInject*/
  constructor() {

  }
}
