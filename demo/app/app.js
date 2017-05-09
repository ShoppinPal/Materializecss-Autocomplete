/**
 * Created by varunsukheja on 04/05/17.
 */
var myApp = angular.module('acDemo', ['material.autocomplete']);

var myController = function ($scope) {
    $scope.name = 'varun';

    $scope.colors = [
        {name: "maroon", hexcode: "#2AFDD4"},
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
        {
            name: "Pravin Jadhav",
            nickname: "PJ",
            email: "pravin@shoppinpal.com",
            picture: "images/pravin.jpg",
            sub1: 'PJSub1',
            sub2: 'PJSub2',
            sub3: 'PJSub3'
        },
        {
            name: "Varun Sukheja",
            nickname: "VS",
            email: "varun@shoppinpal.com",
            picture: "",
            color: 'red',
            sub1: 'VSSub1',
            sub2: 'VSSub2',
            sub3: 'VSSub3'
        },
        {
            name: "Aquid Shahwar",
            nickname: "AS",
            email: "",
            picture: "images/aquid.jpg",
            sub1: 'ASSub1',
            sub2: 'ASSub2',
            sub3: 'ASSub3'
        },
        {
            name: "Harshad Yoavla",
            nickname: "",
            email: "harshad@shoppinpal.com",
            picture: "images/harshad.jpeg",
            sub1: 'HYSub1',
            sub2: 'HYSub2',
            sub3: 'HYSub3'
        },
        {
            name: "Kamal Kahthwani",
            nickname: "KK",
            email: "kamal@shoppinpal.com",
            picture: "images/kamal.png",
            sub1: 'KKSub1',
            sub2: 'KKSub2',
            sub3: 'KKSub3'
        },
        {
            name: "Sayan Bhattacharya",
            nickname: "SB",
            email: "sayan@shoppinpal.com",
            picture: "images/sayan.jpeg",
            sub1: 'SBSub1',
            sub2: 'SBSub2',
            sub3: 'SBSub3'
        }
    ];


};

myApp.controller('acController', myController);