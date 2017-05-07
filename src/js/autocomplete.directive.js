(function () {
    'use strict';
    var MaterialAutocomplete = function () {
        var templateUrl;
        var jsFile = 'materialized.autocomplete.js';
        var bu2 = document.querySelector("script[src$='" + jsFile + "']");
        var currentScriptPath = bu2.src;
        var baseUrl = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/', currentScriptPath.lastIndexOf('/') - 1));

        templateUrl = baseUrl + '/views/list.html';
        var cssUrl = baseUrl + '/css/materialized.autocomplete.css';

        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                id: '@acId',
                inputName: '@acInputName',
                showInputName: '=?acShowInputName',
                placeHolder: '=?acPlaceHolder',
                selectedItem: '=acSelectedItem',
                searchText: '=?acSearchText',
                displayProperty: '@acDisplayProperty',
                displayColor: '@acDisplayColor',
                uniqueDisplayProperty: '=?acUniqueDisplayProperty',
                itemList: '=?acItems',
                remoteMethod: '@?acRemoteMethod',
                itemChange: '&?acSelectedItemChange',
                disableInput: '=?acDisableInput',
                onBlurCb: '&?acOnBlurCb',
                onFocusCb: '&?acOnFocusCb'
            },
            replace: true,
            controller: 'materialAutocompleteCntrl',
            controllerAs: 'ac',
            templateUrl: templateUrl,
        };
    };

    angular.module('material.autocomplete')
        .directive('materialAutocomplete', [MaterialAutocomplete]);
})();
