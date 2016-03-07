'use strict';

angular
    .module('angular.sample')
    .directive('appNavigation', navComponent);

function navComponent() {
    return {
        restrict: 'E',
        scope: { },
        controller: Navigation,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'common/components/navigation/navigation.html',
    };
}

class Navigation {
  /*@ngInject*/
  constructor($rootScope, $state, $mdSidenav) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.navId = 'filterNav';

    this.tabs = [
      { label: 'Opportunities', state: 'main.opportunities' },
      { label: 'About', state: 'main.about' }
    ];

    this.setTabIndex($state.current.name);

    $rootScope.$on('$stateChangeStart', (event, toState) => {
      this.setTabIndex(toState.name);
    });
  }

  setTabIndex(state) {
    this.tabs.forEach((tab, index) => {
      if (state === tab.state) {
        this.tabIndex = index;
      }
    });
  }

  isState(stateName) {
    return (this.$state.current.name === stateName);
  }

  toggleMenu() {
    this.$mdSidenav(this.navId).toggle()
  }
}
