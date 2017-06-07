(function () {
    'use strict';
    var MaterialAutocomplete = function ($timeout) {
        var jsFile = 'materializecss-autocomplete.js';
        var minifiedJsFile = 'materializecss-autocomplete.min.js';
        var jsFileComponent = document.querySelector("script[src$='" + jsFile + "']");
        var minfiedJsFileComponent = document.querySelector("script[src$='" + minifiedJsFile + "']");
        var jsFilePath;
        if (jsFileComponent) {
            jsFilePath = jsFileComponent.src;
        } else if (minfiedJsFileComponent) {
            jsFilePath = minfiedJsFileComponent.src;
        }

        var baseUrl = jsFilePath.substring(0, jsFilePath.lastIndexOf('/', jsFilePath.lastIndexOf('/') - 1));

        var listView = baseUrl + '/views/list.html';

        return {
            restrict: 'E',
            scope: {},
            require: ['^form'],
            bindToController: {
                id: '@acId',
                inputName: '@acInputName',
                showInputName: '=?acShowInputName',
                placeHolder: '@?acPlaceHolder',
                selectedItem: '=acSelectedItem',
                searchText: '=?acSearchText',
                displayProperty1: '@acDisplayProperty1',
                displayProperty2: '@?acDisplayProperty2',
                displayProperty3: '@?acDisplayProperty3',
                displaySubProperty1: '@?acDisplaySubProperty1',
                displaySubProperty2: '@?acDisplaySubProperty2',
                displaySubProperty3: '@?acDisplaySubProperty3',
                displayColor: '@acDisplayColor',
                displayPicture: '@acDisplayPicture',
                uniqueDisplayProperty: '=?acUniqueDisplayProperty',
                itemList: '=?acItems',
                remoteMethod: '@?acRemoteMethod',
                itemChange: '&?acSelectedItemChange',
                disableInput: '=?acDisableInput',
                onBlurCb: '&?acOnBlurCb',
                onFocusCb: '&?acOnFocusCb',
                minlength: '=?acMinlength',
                required: '@?acRequired',
                selectionErrorMessage: '=?acSelectionErrorMessage',
                errorColor: '=?acErrorColor',
                successColor: '=?acSuccessColor',
                disableCrossIcon: '=?acDisableCrossIcon'
            },
            replace: true,
            controller: 'materialAutocompleteCntrl',
            controllerAs: 'ac',
            templateUrl: listView,
            link: function (scope, element, attrs, formCtrl) {
                $timeout(function(){
                    scope.parentForm = formCtrl;
                    scope.$apply();
                }, 10);
            }
        };
    };

    angular.module('material.autocomplete')
        .directive('materialAutocomplete', ['$timeout', MaterialAutocomplete]);
})();
