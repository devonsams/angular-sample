'use strict';

angular
    .module('angular.sample')
    .directive('opportunitiesFilter', opportunitiesFilter);

function opportunitiesFilter() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: Filter,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/opportunities/filter/filter.html'
    };
}

class Filter {
  /*@ngInject*/
  constructor($q, OpportunityService, $mdDialog, $mdSidenav, $mdMedia) {
    this.$q = $q;
    this.$mdMedia = $mdMedia;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.opportunityService = OpportunityService;
    this.navId = 'filterNav';
  }

  showSelected($event) {
    var promise;
    if (!this.$mdMedia('gt-sm')) {
      promise = this.$mdSidenav(this.navId).toggle();
    } else {
      promise = this.$q.when();
    }

    promise.then(() => {
      this.$mdDialog.show({
        targetEvent: $event,
        clickOutsideToClose: true,
        template: '<md-dialog aria-label="Selected Opportunities"><opportunities-selected></opportunities-selected></md-dialog>',
      });
    });
  }
}
