angular.module('app', ['lbServices','ui.router','testing'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('newproduct', {
      url: '/newproduct',
      templateUrl: 'views/newproduct.html',
      controller: 'newproductController'
      })
      .state('productlist', {
        url: '/productlist',
        templateUrl: 'views/productlist.html',
        controller: 'productlistController'
      });
    $urlRouterProvider.otherwise('index');

  }]);
