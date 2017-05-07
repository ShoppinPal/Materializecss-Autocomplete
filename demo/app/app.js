/**
 * Created by varunsukheja on 04/05/17.
 */
var myApp = angular.module('acDemo', ['material.autocomplete']);

var myController = function ($scope) {
    $scope.name = 'varun';

    $scope.colors = [
        {name: "green", hexcode: "#2AFDD4"},
        {name: "red", hexcode: "#BD477C"},
        {name: "pink", hexcode: "#FA2D82"},
        {name: "orange", hexcode: "orange"},
        {name: "purple", hexcode: "purple"},
        {name: "blue", hexcode: "#0CA506"},
        {name: "Yellow", hexcode: "#B7CD89"},
        {name: "grey", hexcode: "#868463"},
        {name: "black", hexcode: "#45ED4D"}
    ];

    $scope.products = [
        {name: "TV", color: 'green'},
        {name: "Oneplus X", color: "red"},
        {name: "Headphone", color: "pink"},
        {name: "MAcbook Air", color: "orange"},
        {name: "Mackbook pro", color: "purple"},
        {name: "sony xperia", color: "blue"},
        {name: "oneplus 3t", color: "Yellow"},
        {name: "samsung galaxy", color: "grey"},
        {name: "samsung edge", color: "black"}
    ];


    $scope.people = [
        {name: "Pravin Jadhav", email: "pravin@shoppinpal.com", picture: "../autocomplete/images/pravin.jpg"},
        {name: "Aquid Shahwar", email: "aquid@shoppinpal.com", picture: "../autocomplete/images/aquid.jpg"},
        {name: "Harshad Yoavla", email: "harshad@shoppinpal.com", picture: "../autocomplete/images/harshad.jpeg"},
        {name: "Kamal Kahthwani", email: "kamal@shoppinpal.com", picture: "../autocomplete/images/kamal.png"},
        {name: "Sayan Bhattacharya", email: "sayan@shoppinpal.com", picture: "../autocomplete/images/sayan.jpeg"}
    ];


};

myApp.controller('acController', myController);