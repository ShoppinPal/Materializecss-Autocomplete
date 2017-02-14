angular.module('app').controller('productlistController',['$scope','Product', function($scope,Product){

  $scope.productList = function(){
    Product.find()
      .$promise
      .then(function(response){
        console.log(response);
        $scope.allProducts = response;
      })
      .catch(function(err){
        console.log(err);
      });
  };
  $scope.productList();
}]);




