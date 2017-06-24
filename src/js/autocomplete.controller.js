(function () {
    'use strict';

    var MaterialAutocompleteCntrl = function ($scope, $element, $q, $timeout) {
        var self = this;

        $timeout(function () {
            self.parentForm = $scope.parentForm;
        }, 20);


        /**
         * Common Keyboard actions and their associated keycode.
         */
        var KEY_CODE = {
            COMMA: 188,
            SEMICOLON: 186,
            ENTER: 13,
            ESCAPE: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            TAB: 9,
            BACKSPACE: 8,
            DELETE: 46
        };

        var noBlur = false,
            hasFocus = false;

        self.required = !!self.required;
        self.isInputFocus = false;
        self.isInputBlur = false;
        self.clearButton = false;
        self.loading = false;
        self.index = -1;
        self.isDisabled = null;
        self.isRequired = null;
        self.hasNotFound = false;
        self.hidden = true;
        if (!self.searchText) {
            self.searchText = '';
        }

        self.init = function () {
            configureWatchers();
            self.element = {
                input: $element.find('input')[0],
                scroller: $element.find('ul')[0],
                scrollContainer: $element[0].querySelector('#acDropdown'),
                label: $element.find('label')[0]
            };
            self.element.li = self.element.scroller.getElementsByTagName('li');
            self.element.$ = getAngularElements(self.element);

            self.setInputName();

            if (self.itemList && typeof self.itemList[0] === 'string') {
                self.itemList = convertArrayToObject(self.itemList);
            }

            if (self.remoteMethod) {
                self.itemList = [];
            }

            if (self.selectedItem && self.displayProperty) {
                self.searchText = self.selectedItem[self.displayProperty];
            }

        };

        /**
         * If showPlaceHolder is true then add placeholder attr to input field of
         */
        self.setPlaceHolder = function () {
            self.element.input.setAttribute('placeholder', self.placeHolder || '');
        };

        /***
         * Function remove placeholder from input
         */
        self.removePlaceHolder = function () {
            try {
                // if input name is given then remove placeholder when blur
                if (self.showInputName || self.showInputName === undefined) {
                    self.element.input.removeAttribute('placeholder');
                }
                if (!self.element.input.value || self.element.input.value === '')
                    self.element.label.classList.remove('active');
            }
            catch (err) {

            }
        };

        /**
         * If showItemName is true then show itemName in label
         */
        self.setInputName = function () {
            // if input name is not given then always show placeholder
            if (self.showInputName === false) {
                self.setPlaceHolder();
                // self.element.label.remove();
            }
        };

        /**
         *  clear the input text field using clear button Check clear button visble and hidden
         */

        function clearValue() {
            clearSelectedItem();
            setInputClearButton();
        }

        self.clearValue = clearValue;

        /**
         * Clears the selected item
         */
        function clearSelectedItem() {
            self.searchText = '';
        }


        /**
         * Clears the searchText value
         */
        function setInputClearButton() {
            // self.searchText has a space character at the end, so we blank it one more time and then
            self.element.input.blur();
            self.element.input.value = null;
            handleSearchText();
            self.element.input.focus();
        }


        /**
         * Sets up any watchers used by autocomplete
         */
        function configureWatchers() {
            // $attrs.$observe('disabled', function (value) { ctrl.isDisabled = $mdUtil.parseAttributeBoolean(value, false); });
            // $attrs.$observe('required', function (value) { ctrl.isRequired = $mdUtil.parseAttributeBoolean(value, false); });
            // $attrs.$observe('readonly', function (value) { ctrl.isReadonly = $mdUtil.parseAttributeBoolean(value, false); });

            $scope.$watch(angular.bind(self, function () {
                return self.searchText;
            }), handleSearchText);
            $scope.$watch(angular.bind(self, function () {
                return self.selectedItem;
            }), selectedItemChange);

            // angular.element($window).on('resize', debouncedOnResize);
            //
            // $scope.$on('$destroy', cleanup);
        }

        /**
         * Handles input focus event, determines if the dropdown should show.
         */
        self.focus = function ($event) {
            // call the callback
            self.isInputFocus = true;
            self.isInputBlur = false;
            angular.isFunction(self.onFocusCb) && self.onFocusCb(); // jshint ignore:line
            self.setPlaceHolder();
            hasFocus = true;
            if (isSearchable() && self.remoteMethod) {
                handleQuery();
            }
            self.hidden = shouldHide();
        };

        /**
         * Handles input blur event, determines if the dropdown should hide.
         */
        self.blur = function ($event) {
            // call the callback
            self.isInputFocus = false;
            self.isInputBlur = true;
            angular.isFunction(self.onBlurCb) && self.onBlurCb(); // jshint ignore:line
            self.removePlaceHolder();
            hasFocus = false;

            if (!noBlur) {
                self.hidden = shouldHide();
            }
        };


        self.selectItem = function (item) {
            self.searchText = item[self.displayProperty1];
            self.selectedItem = item;
            self.hidden = shouldHide();
        };


        /**
         * When the user mouses over the dropdown menu, ignore blur events.
         */
        self.onListEnter = function () {
            noBlur = true;
        };

        /**
         * When the user's mouse leaves the menu, blur events may hide the menu again.
         */
        self.onListLeave = function () {
            if (!hasFocus && !self.hidden) self.element.input.focus();
            noBlur = false;
            self.hidden = shouldHide();
        };

        /**
         * When the mouse button is released, send focus back to the input field.
         */
        self.onMouseup = function () {
            self.element.input.focus();
        };

        /**
         * Handles keyboard input.
         * @param event
         */
        self.keydown = function (event) {
            switch (event.keyCode) {
                case KEY_CODE.DOWN_ARROW:
                    if (self.loading) return;
                    event.stopPropagation();
                    event.preventDefault();
                    self.index = Math.min(self.index + 1, self.itemList.length - 1);
                    updateScroll();
                    break;
                case KEY_CODE.UP_ARROW:
                    if (self.loading) return;
                    event.stopPropagation();
                    event.preventDefault();
                    self.index = self.index < 0 ? self.itemList.length - 1 : Math.max(0, self.index - 1);
                    updateScroll();
                    break;
                case KEY_CODE.ENTER:
                    if (self.hidden || self.loading || self.index < 0 || self.itemList.length < 1) return;
                    if (hasSelection()) return;
                    event.stopPropagation();
                    event.preventDefault();
                    self.selectedItem = self.itemList[self.index];
                    setLoading(false);
                    break;
            }
        };

        /**
         * Determines if the menu should be hidden.
         * @returns {boolean}
         */
        function shouldHide() {
            if (!isSearchable()) return true;    // Hide when not able to query
            return false;            // Hide when the dropdown is not able to show.
        }

        /**
         * Determines whether the autocomplete is able to query within the current state.
         * @returns {boolean}
         */
        function isSearchable() {
            if (self.loading) return false; // No query when query is in progress.
            else if (hasSelection()) return false;           // No query if there is already a selection
            else if (!hasFocus) return false;                // No query if the input does not have focus
            return true;
        }

        /**
         * Returns true if the autocomplete has a valid selection.
         * @returns {boolean}
         */
        function hasSelection() {
            return !!self.selectedItem;
        }

        /**
         * Handles changes to the searchText property.
         * @param searchText
         * @param previousSearchText
         */
        function handleSearchText(searchText, previousSearchText) {
            self.index = -1;
            // do nothing on init
            if (searchText === previousSearchText) return;
            else if (self.selectedItem && self.displayProperty1) {
                setLoading(false);
                if (self.selectedItem[self.displayProperty1] !== searchText) {
                    self.selectedItem = null;
                    self.hidden = shouldHide();
                }
            }
            else if (self.remoteMethod) {
                fetchResults(searchText);
            }
        }

        /**
         * Handles changes to the selected item.
         * @param selectedItem
         * @param previousSelectedItem
         */
        function selectedItemChange(selectedItem, previousSelectedItem) {
            if (selectedItem) {
                if (self.displayProperty1) {
                    self.searchText = selectedItem[self.displayProperty1];
                }
            }
            else if (previousSelectedItem && self.searchText) {
                if (previousSelectedItem[self.displayProperty1] === self.searchText) {
                    self.searchText = '';
                }
            }

            if (selectedItem !== previousSelectedItem) announceItemChange();
        }


        /**
         * Use the user-defined expression to announce changes each time a new item is selected
         */
        function announceItemChange() {
            angular.isFunction(self.itemChange) && self.itemChange(self.selectedItem); // jshint ignore:line
        }

        /**
         * Gathers angular-wrapped versions of each element
         * @param elements
         * @returns {{}}
         */
        function getAngularElements(elements) {
            var obj = {};
            for (var key in elements) {
                if (elements.hasOwnProperty(key)) obj[key] = angular.element(elements[key]);
            }
            return obj;
        }

        /**
         * Makes sure that the focused element is within view.
         */
        function updateScroll() {
            if (!self.element.li[0]) return;
            var height = self.element.li[0].offsetHeight,
                top = height * self.index,
                bot = top + height,
                hgt = self.element.scroller.clientHeight,
                scrollTop = self.element.scroller.scrollTop;
            if (top < scrollTop) {
                scrollTo(top);
            } else if (bot > scrollTop + hgt) {
                scrollTo(bot - hgt);
            }
        }

        function scrollTo(offset) {
            self.element.scroller.scrollTop = offset;
        }

        /**
         * Sets the loading parameter and updates the hidden state.
         * @param value {boolean} Whether or not the component is currently loading.
         */
        function setLoading(value) {
            if (self.loading !== value) {
                self.loading = value;
            }

            // Always refresh the hidden variable as something else might have changed
            self.hidden = shouldHide();
        }

        /**
         * Fetches the results for the provided search text.
         * @param searchText
         */
        function fetchResults(searchText) {
            var items = $scope.$parent.$eval(self.remoteMethod),
                isList = angular.isArray(items),
                isPromise = items ? !!items.then : false; // Every promise should contain a `then` property

            if (isList) onResultsRetrieved(items);
            else if (isPromise) handleAsyncResults(items);

            function handleAsyncResults(items) {
                if (!items) return;

                items = $q.when(items);
                setLoading(true);
                items.then(onResultsRetrieved);
            }

            function onResultsRetrieved(matches) {

                // Just cache the results if the request is now outdated.
                // The request becomes outdated, when the new searchText has changed during the result fetching.
                if ((searchText || '') !== (self.searchText || '')) {
                    return;
                }

                handleResults(matches);
            }
        }

        /**
         * Starts the query to gather the results for the current searchText.
         */
        function handleQuery() {
            var searchText = self.searchText || '';
            fetchResults(searchText);
            self.hidden = shouldHide();
        }

        /**
         * This function check for result uniqueness on displayProperty1 params and return unique array
         * @param results
         * @returns {Array}
         */
        function handleUniqueResult(results) {
            var res = [], flag = {};
            for (var i = 0; i < results.length; i++) {
                if (flag[results[i][self.displayProperty1]]) continue;
                flag[results[i][self.displayProperty1]] = true;
                res.push(results[i]);
            }
            return res;
        }

        /**
         * Handles the retrieved results by showing them in the autocompletes dropdown.
         * @param results Retrieved results
         */
        function handleResults(results) {
            // check if uniqueDisplayProperty is set
            // then filter the result to uniqueness
            if (self.uniqueDisplayProperty)
                results = handleUniqueResult(results);
            self.itemList = results;
            self.hidden = shouldHide();

            // If loading is in progress, then we'll end the progress. This is needed for example,
            // when the `clear` button was clicked, because there we always show the loading process, to prevent flashing.
            if (self.loading) setLoading(false);
        }

        /**
         * This function converts an array of strings to object of strings with key "index"
         * @param array
         * @returns {Array}
         */
        function convertArrayToObject(array) {
            var temp = [];
            array.forEach(function (text) {
                temp.push({
                    index: text
                });
            });
            return temp;
        }

        /**
         * This function gives style to error or success Text Message
         * @param colorHashCode or color name
         * @returns {Style}
         */
        self.setTextStyle = function (color) {
            return {'color': color};
        };

        /**
         * This function gives style to Input border on success or error
         * @param colorHashCode or color name
         * @returns {Style}
         */
        self.setInputBorderStyle = function (color) {
            return {
                'border-bottom-color': color,
                'box-shadow': '0 1px 0 0 ' + color
            };
        };

        /**
         * This function checks whether autocomplete is successfully validated
         * @returns {boolean}
         */
        self.checkSuccess = function () {
            return self.isInputFocus && self.selectedItem && !self.disableInput;
        };

        /**
         * This function checks condition for error message to display
         * @returns {boolean}
         */
        self.checkError = function () {
            var isFormSubmitted = false;
            if (self.parentForm && self.parentForm !== null) {
                isFormSubmitted = self.parentForm.$submitted;
            }
            return self.required && !self.disableInput && !self.selectedItem && (self.isInputBlur || isFormSubmitted);
        };

    };

    angular.module('material.autocomplete')
        .controller('materialAutocompleteCntrl', [
            '$scope',
            '$element',
            '$q',
            '$timeout',
            MaterialAutocompleteCntrl
        ]);


})();
