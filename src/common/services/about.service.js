'use strict';

class AboutService {
  /*@ngInject*/
  constructor($q, localStorageService, $mdToast) {
    this.key = 'user';
    this.$q = $q;
    this.$mdToast = $mdToast;
    this.localStorageService = localStorageService;
    this.user = localStorageService.get(this.key);
  }

  save() {
    this.localStorageService.set(this.key, this.user);
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Save Complete!')
        .position('bottom right')
        .hideDelay(3000)
    );
  }

  delete() {
    this.user = {};
    this.localStorageService.remove(this.key);
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Delete Complete!')
        .position('bottom right')
        .hideDelay(3000)
    );
  }

}

angular
    .module('angular.sample')
    .service('AboutService', AboutService);
