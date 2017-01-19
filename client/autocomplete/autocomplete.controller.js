(function () {
    'use strict';

    var MaterialAutocompleteCntrl = function ($scope, $element, $q, $timeout) {
        var self = this;
        /**
         * Common Keyboard actions and their associated keycode.
         */

        self.positionDropdown = positionDropdown;
        self.setInputClearButton = setInputClearButton;
        self.clearValue = clearValue;
        self.clearSelectedItem = clearSelectedItem;
        self.onChangeColor = onChangeColor;

        self.searchAll = "";
        self.isDropUp = false;
        self.hasNotFound = false;
        self.matches = [];

        self.isDisabled = true;

        var ITEM_HEIGHT = 45,
            MAX_ITEMS = 5,
            fetchesInProgress = 0;


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

        self.isDisabled = true;
        self.scope = $scope;
        self.searchText = [];
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



        //for the data fetching from the database and display
        self.init = function () {
            configureWatchers();
            positionDropdown();


            self.element = {
                input: $element.find('input')[0],
                scroller: $element.find('ul')[0],
                label: $element.find('label')[0],
                span: $element.find('span')[0],
                scrollContainer: $element[0].querySelector('#acDropdown-'+self.autocompleteId)


            };

            self.element.li = self.element.scroller.getElementsByTagName('li');
            self.element.$ = getAngularElements(self.element);


            if (self.remoteMethod) {
                self.itemList = [];
            }

            if (self.selectedItem && self.displayProperty) {
                self.searchText = self.selectedItem[self.displayProperty];
            }

        };


        /*
         *    If showPlaceHolder is true then add placeholder attr to input field of
         */

        self.setPlaceHolder = function () {

            self.element.input.setAttribute('placeholder', self.placeHolder || ' ');
        };



        /*
         *    Function remove placeholder from input
         */

        self.removePlaceHolder = function (removeInputClass) {
            positionDropdown();

            if (removeInputClass === undefined)
                removeInputClass = true;
            try {
                if (self.showInputName || self.showInputName == undefined) {
                    self.element.input.removeAttribute('placeholder');
                }
                if ((!self.element.input.value || self.element.input.value === '') && removeInputClass) {
                    self.element.label.classList.remove('active');
                }

            }
            catch (err) {
            }


        };

        /*
         * If showItemName is true then show itemName in label
         */


        self.setInputName = function () {
            positionDropdown();

            // if input name is not given then always show placeholder

            if (self.showInputName === false) {
                self.setPlaceHolder();
            }

        };


        /**
         *  clear the input text field using clear button Check clear button visble and hidden
         */

        function clearValue() {
            setInputClearButton();
            clearSelectedItem();
        }

        /**
         * Clears the selected item
         */
        function clearSelectedItem() {
             //self.index = 0;
             self.searchText = [];
        }


        /**
         * Clears the searchText value
         */
        function setInputClearButton() {

            // self.searchText has a space character at the end, so we blank it one more time and then
            // focus.
            self.element.input.blur();
            self.element.input.value = null;
            handleSearchText();
            self.element.input.focus();
        }



        /**
         * Returns the minimum length needed to display the dropdown.
         */
        self.getMinLength = function () {
            return angular.isNumber(self.minLength) ? self.minLength : 0;
        };


        /**
         * Determines if the minimum length is met by the search text.
         */
        self.isMinLengthMet = function () {
            return (self.searchText || '').length >= self.getMinLength();
        };


        /**
         * Determines if the menu should be shown.
         */
        self.shouldShow = function () {
            return (self.isMinLengthMet() && self.hasMatches()) || self.notFoundVisible();
        };



        /**
         * Returns true if the search text has itemList.
         */
        self.hasMatches = function(){
            return self.itemList.length ? true : false ;
        };


        /**
         * Returns true if the loading indicator is, or should be, visible.
         */
        self.loadingIsVisible = function () {
            return self.loading && !hasSelection();
        };

        self.isPromiseFetching = function () {
            return fetchesInProgress !== 0;
        };

        self.notFoundVisible = function () {
            var  textlength = (self.scope.searchText || '').length;
            return self.hasNotFound && !self.hasMatches() && (self.loading || self.isPromiseFetching()) &&  textlength >= self.getMinLength() && (hasFocus || noBlur) && !hasSelection();
        };



        /**
         *    To check dropdown position and placed list to the according to the viewport
         */

        function positionDropdown() {


            var windoWheight = $(window).height(),
                scrollTop = $(window).scrollTop(),
                inputTop = $('.acDirectiveAutocomplete').offset().top,
                inputHeight = $('.acDirectiveAutocomplete').height(),

                dropdownHeight = ($scope.dropdownItems || MAX_ITEMS) * ITEM_HEIGHT,
                //dropAutocomplete1 = document.getElementById('acDropdown'),
                dropAutocomplete = document.getElementsByClassName("acDropdownAutocomplete")[0],
                upperHeight = (inputTop - scrollTop),
                bottomDistance = ( windoWheight + scrollTop ) - (inputTop + inputHeight);

                // var rect = document.getElementsByClassName("acDropdownAutocomplete")[0].getBoundingClientRect();
                // console.log(rect.top, rect.right, rect.bottom, rect.left);

            $timeout(function () {

                if (bottomDistance < upperHeight && bottomDistance < dropdownHeight) {
                    self.isDropUp = true;
                    dropAutocomplete.style.top = "-202px";
                    //console.log('hello1');
                }
                else if (upperHeight < dropdownHeight && bottomDistance > dropdownHeight) {
                    self.isDropUp = false;
                    dropAutocomplete.style.top = "63px";
                    //console.log('hello2');

                }
                else {
                    self.isDropUp = false;
                    dropAutocomplete.style.top = "63px";
                    //console.log('hello3');

                }
            });

        }

        positionDropdown();



       function onChangeColor () {
            // var inputBorder = document.getElementById('autocomplete');
            //
            // if(self.itemList.length !== ""){
            //     inputBorder.style.borderBottomColor = "black";
            // }
            // else {
            //     inputBorder.style.borderBottomColor = "green";
            // }

        };


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


            self.setPlaceHolder();

            if (isSearchable() &&  self.isMinLengthMet()) {

                handleQuery();
            }
            hasFocus = true;
            self.hidden = shouldHide();
        };

        /**
         * Handles input blur event, determines if the dropdown should hide.
         */
        self.blur = function ($event) {
            self.removePlaceHolder();
            if (!noBlur) {
                hasFocus = false;
                self.hidden = shouldHide();

            }
        };


        self.selectItem = function (item) {
            self.searchText = item[self.displayProperty];
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

                case KEY_CODE.RIGHT_ARROW:
                    if (self.hidden || self.loading || self.index < 0 || self.itemList.length < 1) return;
                    if (hasSelection()) return;
                    self.selectedItem = self.itemList[self.index];
                    setLoading(false);
                    break;

                case KEY_CODE.ESCAPE:
                    event.preventDefault();
                    event.stopPropagation();
                    self.blur();
                    break;

                case KEY_CODE.TAB:
                    self.onListLeave();
                    if(self.hidden || self.loading || self.index < 0 || self.itemList.length < 1) return;
                    event.preventDefault();
                    event.stopPropagation();
                    break;

            }
        };

        /**
         * Determines if the menu should be hidden.
         * @returns {boolean}
         */
        function shouldHide() {
            if (!isSearchable())
                return true;    // Hide when not able to query
            else
                return !self.shouldShow();   // Hide when the dropdown is not able to show.
        }

        /**
         * Determines whether the autocomplete is able to query within the current state.
         * @returns {boolean}
         */
        function isSearchable() {
            if (self.loading && !self.hasMatches()) return false; // No query when query is in progress.
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

            if (searchText === previousSearchText) return;
            else if (self.selectedItem && self.displayProperty) {
                setLoading(false);
                if (self.selectedItem[self.displayProperty] !== searchText) {
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
                if (self.displayProperty) {
                    self.searchText = selectedItem[self.displayProperty];

                }
            }
            else if (previousSelectedItem && self.searchText) {
                if (previousSelectedItem[self.displayProperty] === self.searchText) {
                    self.searchText = '';
                    hasFocus = false;
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
                isPromise = !!items.then; // Every promise should contain a `then` property

            if (isList) onResultsRetrieved(items);
            else if (isPromise) handleAsyncResults(items);

            function handleAsyncResults(items) {
                if (!items) return hasFocus = false;

                items = $q.when(items);
                setLoading(true);
                items.then(onResultsRetrieved);
            }

            function onResultsRetrieved(matches) {

                // Just cache the results if the request is now outdated.
                // The request becomes outdated, when the new searchText has changed during the result fetching.
                if ((searchText || '') !== (self.searchText || '')) {
                    return hasFocus = false;

                }

                handleResults(matches);
            }
        }

        /**
         * Starts the query to gather the results for the current searchText.
         */
        function handleQuery() {
            var searchText = self.searchText || '';
            if(!self.remoteMethod && self.itemList.length){
                handleResults(self.itemList);
            }
            else if(self.remoteMethod){
                fetchResults(searchText);
            }
            self.hidden = shouldHide();
        }

        /**
         * Handles the retrieved results by showing them in the autocompletes dropdown.
         * @param results Retrieved results
         */
        function handleResults(results) {
            self.itemList = results;
            self.hidden = shouldHide();
            positionDropdown();

            // If loading is in progress, then we'll end the progress. This is needed for example,
            // when the `clear` button was clicked, because there we always show the loading process, to prevent flashing.
            if (self.loading) {
                setLoading(false);

            }
            }


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
