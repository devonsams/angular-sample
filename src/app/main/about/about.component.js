angular
    .module('angular.sample')
    .directive('about', aboutComponent);

function aboutComponent() {
    return {
        restrict: 'E',
        scope: {
            // isolated scope, use to pass data from parent
            // eg: data: '='
        },
        controller: About,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/main/about/about.html'
    };
}

class About {
    /*@ngInject*/
    constructor(AboutService) {
        this.aboutService = AboutService;
    }

}
