(function () {
    'use strict';
    var MaterialAutocomplete = function () {
                
            var simple = 'autocomplete/views/autocomplete.html',
                profile = 'autocomplete/views/profile.html',
                color = 'autocomplete/views/color.html';

                    
        return {
            restrict: 'E',
            scope: {},
            bindToController : {
                inputName: '@acInputName',
                selectedItem : '=acSelectedItem',
                searchText: '=?acSearchText',
                displayProperty: '@acDisplayProperty',
                displayEmail:'@acDisplayEmail',
                displayPicture:'@acDisplayPicture',
                displayColor:'@acDisplayColor',
                itemList:   '=?acItems',
                remoteMethod: '@?acRemoteMethod',
                itemChange:   '&?acSelectedItemChange',
                showInputName: '=?acShowInputName',
                placeHolder: '@?acPlaceHolder',
                dropdownItems:    '=?acDropdownItems',
                clearButton:      '=?acClearButton',
                inputMinlength:   '@acInputMinlength',
                minLength:        '=?acMinLength',
                autocompleteId: '@acAutocompleteId',
                isDisabled:'@?acIsDisabled',
                imageUri:'@acImageUri',
                imageField:'@acImageField',
                templateStyle:'=acTemplateStyle',
                autocompleteClass:'@acAutocompleteClass',
                hasNotFound:'=?achasNotFound'
             




            },
            replace: true,
            controller: 'materialAutocompleteCntrl',
            controllerAs: 'ac',
            templateUrl: function(element,attrs){
                if(attrs.acTemplateStyle == "simpleTemplate"){
                    return simple
                }
                if(attrs.acTemplateStyle == "colorTemplate"){
                        return color;
                }
                if(attrs.acTemplateStyle == "profileTemplate"){
                        return profile;
                }

            }
           
        };

     
    };

    angular.module('material.autocomplete')
        .directive('materialAutocomplete', [ 
            MaterialAutocomplete
        ]);
})();
