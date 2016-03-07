'use strict';

angular
    .module('angular.sample')
    .directive('main', mainComponent);

function mainComponent() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: Main,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/main.html'
    };
}

class Main {
    /*@ngInject*/
    constructor($http, $timeout) {
    }

    doStuff() {
        // ...
    }
}
