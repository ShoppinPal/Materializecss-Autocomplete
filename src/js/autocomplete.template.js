angular.module('material.autocomplete.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('ac-templates',
    '<script type=text/ng-template id=acTemplate.html><div name="searchAutocomplete" id="autocompleteForm-{{ac.id}}" ng-init="ac.inputFieldName=\'acInputField-\'+ac.id">\n' +
    '        <div id="acDirective" class="acDirectiveAutocomplete">\n' +
    '            <div class="row">\n' +
    '                <div id="acForm" class="input-field col s12 has-clear" ng-init="ac.init()">\n' +
    '                    <input id="autocomplete-{{ac.id}}"\n' +
    '                           name="{{ac.inputFieldName}}"\n' +
    '                           type="text"\n' +
    '                           ng-model="ac.searchText"\n' +
    '                           ng-focus="ac.focus($event)"\n' +
    '                           ng-blur="ac.blur($event)"\n' +
    '                           ng-keydown="ac.keydown($event)"\n' +
    '                           ng-disabled="ac.disableInput"\n' +
    '                           ng-required="ac.required"\n' +
    '                           autocomplete="off"\n' +
    '                           class="ac-input"\n' +
    '                           ng-style="(ac.required && (ac.checkError() ||  ac.parentForm[0].$submitted))  && ac.errorInputStyle(ac.errorColor) || ac.checkSuccess() && ac.successInputStyle(ac.successColor)"\n' +
    '                    >\n' +
    '                    <span ng-if="!ac.disableCrossIcon && ac.searchText.length>0" id="clear {{ac.autocompleteId}}"\n' +
    '                          class="clearBtn" title="Clear"\n' +
    '                          ng-click="ac.clearValue()">&times;</span>\n' +
    '                    <label for="autocomplete-{{ac.id}}" ng-class="{\'active\':(ac.searchText||ac.isInputFocus)}"\n' +
    '                           ng-style="(ac.required && (ac.checkError() ||  ac.parentForm[0].$submitted)) && ac.errorTextStyle(ac.errorColor) || ac.checkSuccess() && ac.successTextStyle(ac.successColor)">\n' +
    '                        {{ac.inputName}}\n' +
    '                    </label>\n' +
    '                    <span class="text-input-wrapper"></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="progress" ng-show="ac.loading">\n' +
    '                <div class="indeterminate"></div>\n' +
    '            </div>\n' +
    '            <div class=" row" ng-hide="ac.hidden" ng-mouseenter="ac.onListEnter()"\n' +
    '                 ng-mouseleave="ac.onListLeave()" ng-mouseup="ac.onMouseup()">\n' +
    '                <div id="acDropdown" class=" s12">\n' +
    '                    <ul class="collection dropdown-ul" role="menu" aria-labelledby="simple-btn-keyboard-nav"\n' +
    '                        ng-show="ac.itemList.length>0">\n' +
    '                        <li class="collection-item  dropdown-li waves-effect"\n' +
    '                            ng-repeat="item in ac.itemList | filter: (!ac.remoteMethod ? ac.searchText  : \'\' )"\n' +
    '                            ng-click="ac.selectItem(item)"\n' +
    '                            ng-class="{\'selected\': $index === ac.index,\'avatar\':item[ac.displayPicture]}">\n' +
    '\n' +
    '                            <img ng-if="item[ac.displayPicture]" ng-src="{{item[ac.displayPicture]}}" alt=""\n' +
    '                                 class="circle">\n' +
    '                            <div ng-if="ac.displayColor"\n' +
    '                                 class="circle displayColor left"\n' +
    '                                 ng-style="{\'background-color\': item[ac.displayColor]}">\n' +
    '                            </div>\n' +
    '                            <div>{{item[ac.displayProperty1]}}<span\n' +
    '                                    class="right">{{item[ac.displaySubProperty1]}}</span>\n' +
    '                            </div>\n' +
    '                            <div ng-if="item[ac.displayProperty2]">{{item[ac.displayProperty2]}}<span class="right">{{item[ac.displaySubProperty2]}}</span>\n' +
    '                            </div>\n' +
    '                            <div ng-if="item[ac.displayProperty3]">{{item[ac.displayProperty3]}}<span class="right">{{item[ac.displaySubProperty3]}}</span>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <ul class="collection dropdown-ul" role="menu" aria-labelledby="simple-btn-keyboard-nav"\n' +
    '                        ng-hide="ac.itemList.length>0 || !ac.searchText">\n' +
    '                        <li class="collection-item  dropdown-li waves-effect">\n' +
    '                            Your search <b>"{{ac.searchText}}"</b> was not found\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-if="(ac.required && (ac.checkError() ||  ac.parentForm[0].$submitted))"\n' +
    '                 class="right errorMsg"\n' +
    '                 ng-style="ac.errorTextStyle(ac.errorColor)">\n' +
    '                {{ac.selectionErrorMessage}}\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div></script>');
}]);
