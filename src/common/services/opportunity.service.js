'use strict';

class OpportunityService {
  /*@ngInject*/
  constructor($q) {
    this.$q = $q;
    this.new = false;
    this.existing = false;
    this.opportunities = [
      {
        id: 1,
        //domain: string value (for example: techcrunch.com)
        domain: 'arstechnica.com',
        //status: string with one of the following values: {Grow your current relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 2,
        //domain: string value (for example: techcrunch.com)
        domain: 'techcrunch.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 3,
        //domain: string value (for example: techcrunch.com)
        domain: 'theverge.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 4,
        //domain: string value (for example: techcrunch.com)
        domain: 'thenextweb.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 5,
        //domain: string value (for example: techcrunch.com)
        domain: 'gizmodo.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 6,
        //domain: string value (for example: techcrunch.com)
        domain: 'news.ycombinator.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 7,
        //domain: string value (for example: techcrunch.com)
        domain: 'reddit.com/r/programming',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 8,
        //domain: string value (for example: techcrunch.com)
        domain: 'mashable.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225',
      }, {
        id: 9,
        //domain: string value (for example: techcrunch.com)
        domain: 'smashingmagazine.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 10,
        //domain: string value (for example: techcrunch.com)
        domain: 'gigaom.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 11,
        //domain: string value (for example: techcrunch.com)
        domain: 'zdnet.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 12,
        //domain: string value (for example: techcrunch.com)
        domain: 'wired.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 13,
        //domain: string value (for example: techcrunch.com)
        domain: 'popsci.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 14,
        //domain: string value (for example: techcrunch.com)
        domain: 'readwriteweb.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 15,
        //domain: string value (for example: techcrunch.com)
        domain: 'recode.net',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 16,
        //domain: string value (for example: techcrunch.com)
        domain: 'huffingtonpost.com/tech/',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 17,
        //domain: string value (for example: techcrunch.com)
        domain: 'venturebeat.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 18,
        //domain: string value (for example: techcrunch.com)
        domain: 'commitstrip.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 19,
        //domain: string value (for example: techcrunch.com)
        domain: 'codinghorror.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 20,
        //domain: string value (for example: techcrunch.com)
        domain: 'eff.org',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Create a new relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }, {
        id: 21,
        //domain: string value (for example: techcrunch.com)
        domain: 'webdesignerdepot.com',
        //status: string with one of the following values: {Create a new relationship, Grow your current relationship}
        status: 'Grow your current relationship',
        //image_url: string value
        image_url: 'http://placehold.it/375x225'
      }
    ];

    // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
    this.filterFn = (opportunity) => {
      if (this.new && !this.existing) {
        return (opportunity.status === 'Create a new relationship');
      } else if (!this.new && this.existing) {
        return (opportunity.status === 'Grow your current relationship');
      } else {
        return true;
      }
    }
  }

  getOpportunities() {
      return this.opportunities;
  }

}

angular
    .module('angular.sample')
    .service('OpportunityService', OpportunityService);
