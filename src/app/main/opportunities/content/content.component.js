'use strict';

angular
    .module('angular.sample')
    .directive('opportunitiesContent', opportunitiesContent);

function opportunitiesContent() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: Content,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/opportunities/content/content.html'
    };
}

class Content {
  /*@ngInject*/
  constructor(OpportunityService) {
    this.opportunityService = OpportunityService;
  }
}
