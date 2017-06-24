(function () {
    'use strict';
    var MaterialAutocomplete = function ($timeout) {
        return {
            restrict: 'E',
            scope: {},
            require: ['^?form'],
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
                required: '=?acRequired',
                selectionErrorMessage: '=?acSelectionErrorMessage',
                errorColor: '=?acErrorColor',
                successColor: '=?acSuccessColor',
                disableCrossIcon: '=?acDisableCrossIcon'
            },
            replace: true,
            controller: 'materialAutocompleteCntrl',
            controllerAs: 'ac',
            templateUrl: 'acTemplate.html',
            link: function (scope, element, attrs, formCtrl) {
                $timeout(function () {
                    scope.parentForm = formCtrl[0];
                    if (formCtrl[0] && formCtrl[0].$$parentForm.$name) {
                        scope.parentForm = formCtrl[0].$$parentForm;
                    }
                    scope.$apply();
                }, 10);
            }
        };
    };

    angular.module('material.autocomplete')
        .directive('materialAutocomplete', ['$timeout', MaterialAutocomplete]);
})();
