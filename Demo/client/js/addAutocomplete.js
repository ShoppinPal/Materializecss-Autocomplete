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
     
      self.color =[
        {name:"green",color:'green'},
        {name:"red" , color:"red"},
        {name:"pink", color:"pink"},
        {name:"orange", color:"orange"},
        {name:"purple" , color:"purple"},
        {name:"blue" , color:"blue"},
        {name:"Yellow" , color:"Yellow"},
        {name:"grey" , color:"grey"},
        {name:"black" , color:"black"}
      ] 


      self.people=[
          {name:"Pravin Jadhav" , email:"pravin@shoppinpal.com" , picture:"../autocomplete/images/pravin.jpg"},
          {name:"Aquid Shahwar" , email:"aquid@shoppinpal.com",picture:"../autocomplete/images/aquid.jpg"},
          {name:"Harshad Yoavla" ,email:"harshad@shoppinpal.com",picture:"../autocomplete/images/harshad.jpeg"},
          {name:"Kamal Kahthwani",email:"kamal@shoppinpal.com",picture:"../autocomplete/images/kamal.png"},
          {name:"Sayan Bhattacharya",email:"sayan@shoppinpal.com",picture:"../autocomplete/images/sayan.jpeg"}
      ]
      
 
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


