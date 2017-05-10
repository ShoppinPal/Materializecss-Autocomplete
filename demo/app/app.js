/**
 * Created by varunsukheja on 04/05/17.
 */
var myApp = angular.module('acDemo', ['material.autocomplete']);

var myController = function ($scope) {
    $scope.name = 'varun';

    $scope.colorList = [
        {colorName: "maroon", colorCode: "maroon"},
        {colorName: "aqua", colorCode: "#2AFDD4"},
        {colorName: "red", colorCode: "#BD477C"},
        {colorName: "pink", colorCode: "#FA2D82"},
        {colorName: "orange", colorCode: "orange"},
        {colorName: "purple", colorCode: "purple"},
        {colorName: "green", colorCode: "#0CA506"},
        {colorName: "cornsilk", colorCode: "#cdc8b1"},
        {colorName: "darkOliveGreen", colorCode: "#a2cd5a"},
        {colorName: "khakhi", colorCode: "#8b864e"}
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

    $scope.cars = [
        {name: "Ford", models: ["Fiesta", "Focus", "Mustang"]},
        {name: "BMW", models: ["320", "X3", "X5"]},
        {name: "Fiat", models: ["500", "Panda"]}
    ]

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
            // picture: "https://yt3.ggpht.com/-4sNEvCcERuQ/AAAAAAAAAAI/AAAAAAAAAAA/I6sSxupXGVQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
            picture: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAelAAAAJDQ5ZTE3YTAzLTk1ZDMtNGI0MS05ZmNiLTRkMjY5MGZmNWZhZg.jpg",
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


    $scope.foodList = [
        {food: "pasta", price: "$76.20"},
        {food: "soups", price: "$2.57"},
        {food: "pasta", price: "$43.16"},
        {food: "seafood", price: "$16.53"},
        {food: "desserts", price: "$98.77"},
        {food: "cereals", price: "$93.46"},
        {food: "desserts", price: "$21.19"},
        {food: "pies", price: "$24.58"},
        {food: "sandwiches", price: "$1.02"},
        {food: "pasta", price: "$71.00"},
        {food: "pies", price: "$38.38"},
        {food: "pasta", price: "$45.06"},
        {food: "pasta", price: "$30.52"},
        {food: "soups", price: "$48.46"},
        {food: "salads", price: "$73.38"}
    ];

    $scope.fullProfileList = [
        {
            age: 31,
            name: "Taylor Daugherty",
            gender: "female",
            email: "taylordaugherty@handshake.com",
            phone: "+1 (923) 570-2216",
            address: "105 Dewey Place, Golconda, South Dakota, 3593"
        },
        {
            age: 35,
            name: "Johnson Moran",
            gender: "male",
            email: "johnsonmoran@handshake.com",
            phone: "+1 (835) 558-2053",
            address: "895 Columbus Place, Veguita, Delaware, 5446"
        },
        {
            age: 29,
            name: "Burke Estrada",
            gender: "male",
            email: "burkeestrada@handshake.com",
            phone: "+1 (953) 520-3799",
            address: "253 Rodney Street, Hayden, California, 1744"
        },
        {
            age: 40,
            name: "Harvey Pope",
            gender: "male",
            email: "harveypope@handshake.com",
            phone: "+1 (975) 582-3419",
            address: "852 Jewel Street, Kirk, Puerto Rico, 376"
        },
        {
            age: 39,
            name: "Marquita Curtis",
            gender: "female",
            email: "marquitacurtis@handshake.com",
            phone: "+1 (942) 409-2760",
            address: "200 Danforth Street, Kennedyville, Arizona, 384"
        },
        {
            age: 40,
            name: "Acosta Oneal",
            gender: "male",
            email: "acostaoneal@handshake.com",
            phone: "+1 (870) 497-3787",
            address: "194 Lefferts Avenue, Hanover, Missouri, 9315"
        },
        {
            age: 26,
            name: "Kimberly Koch",
            gender: "female",
            email: "kimberlykoch@handshake.com",
            phone: "+1 (933) 489-3685",
            address: "122 Waldane Court, Bayview, District Of Columbia, 6477"
        }
    ];

};

myApp.controller('acController', myController);