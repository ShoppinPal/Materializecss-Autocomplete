angular.module('app').controller('newproductController',['$scope','Product', function($scope,Product){

  $scope.product = {
    "name": null,
    "color": null,
  }
  $scope.pname = null;
  $scope.pcolor = null;

  $scope.addProduct = function(object){

    console.log($scope.pname,$scope.pcolor);
    var obj = {name:$scope.pname, color: $scope.pcolor};
    Product.create(obj)
    .$promise
    .then(function(response){
    })
    .catch(function(err){
      console.log(err);
    });
  };

}]);
