(function () {
  'use strict';
  var module = angular.module('testing', ['material.autocomplete'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('autoComplete', {
        url: '/auto',
        templateUrl: '../views/testing.html',
        controllerAs: 'test',
        controller: 'AddAutocompleteCntrl'
      });

    }])
    .controller('AddAutocompleteCntrl' , ['Product',function (Product) {

      var self = this;
      // self.text = "Hello world";
      self.data_list = [
        {
          "name": "Pravin",
          "value": "pravinsname",
          "address": "adsklfjkldsa"
        },
        {
          "name": "Aquid",
          "value": "aquidsname",
          "address": "aquids address"
        }
      ];

      self.fetchDataFromServer = function (searchquery) {
        return Product.find({
          'filter': {
            where: {
              'name': {
                'regexp': '/' + searchquery + '/i'
              }
            }
          }
        }).$promise;
      };







    }]);
})();


