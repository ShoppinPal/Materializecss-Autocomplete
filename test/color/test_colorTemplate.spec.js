/**
 * Created by varunsukheja on 24/06/17.
 */
describe('check autocomplete', function () {
    var acFunctions = require('./../global_tests/pages/ac.simpleTest.po.js');
    var acFunctionsInstance = new acFunctions();

    afterEach(function () {
        browser.manage().logs().get('browser').then(function (browserLog) {
            expect(browserLog.length).toEqual(0);
            if (browserLog.length) {
                console.error('log: ' + JSON.stringify(browserLog));
            }
        });
    });

    it('should check autocomplete working', function () {
        browser.get(browser.baseUrl);
        acFunctionsInstance.autoCompleteSelect('color');

    });
});