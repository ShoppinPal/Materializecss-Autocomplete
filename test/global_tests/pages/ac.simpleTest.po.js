module.exports = function () {
    var self = this;
    var EC = protractor.ExpectedConditions;

    /**
     * @description Clicks on autocomplete field of selected item, and chooses
     * the first option from dropdown
     * @param acId - value given in ac-id
     */
    self.autoCompleteSelect = function (acId) {
        var testValue = 'maroon';

        var autocompleteId = 'autocomplete-' + acId;
        var acInputField = element(by.id(autocompleteId));
        browser.wait(EC.visibilityOf(acInputField), 5000, 'autocomplete timeout, not visible');
        acInputField.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        var acInputFieldValue = acInputField.getAttribute('value');
        expect(acInputFieldValue).toEqual(testValue);

    };

};
