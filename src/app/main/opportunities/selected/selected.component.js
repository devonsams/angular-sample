'use strict';

angular
    .module('angular.sample')
    .directive('opportunitiesSelected', opportunitiesSelected);

function opportunitiesSelected() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: Selected,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/opportunities/selected/selected.html'
    };
}

class Selected {
  /*@ngInject*/
  constructor(OpportunityService, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.opportunityService = OpportunityService;
  }

  closeDialog() {
    this.$mdDialog.hide()
  }
}
