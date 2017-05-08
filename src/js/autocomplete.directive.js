(function () {
    'use strict';
    var MaterialAutocomplete = function () {
        var jsFile = 'materialized.autocomplete.js';
        var bu2 = document.querySelector("script[src$='" + jsFile + "']");
        var currentScriptPath = bu2.src;
        var baseUrl = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/', currentScriptPath.lastIndexOf('/') - 1));

        var listView = baseUrl + '/views/list.html';
        var listView2 = baseUrl + '/views/list2.html';
        var profileView = baseUrl + '/views/profile.html';

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
                displayProperty1: '@acDisplayProperty1',
                displayProperty2: '@acDisplayProperty2',
                displayProperty3: '@acDisplayProperty3',
                displayColor: '@acDisplayColor',
                displayPicture: '@acDisplayPicture',
                isMultiValued: '=acIsMultiValued',
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
            templateUrl: listView2,
        };
    };

    angular.module('material.autocomplete')
        .directive('materialAutocomplete', [MaterialAutocomplete]);
})();
