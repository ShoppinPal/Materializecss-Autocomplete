  describe('check dropdown', function( ) {
  
  it('should check autocomplete working', function() {
    browser.get('http://localhost:3000/#/auto');
    var inputField   = element(by.css('input[name="autocomplete"]'));    
    inputField.click().sendKeys('T');
    browser.sleep(500);
    inputField.click().sendKeys('V').click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
    element.all(by.repeater('item in ac.itemList')).get(0).getText();
      var clearButton = element(by.css('.clearBtn'));  
      clearButton.click();

      
   
browser.sleep(500);
       var inputFieldProfile = element(by.css('input[name="autocompleteProfile"]')),
       divElementDirectiveProfile = element(by.css('.acDirectiveAutocompleteProfile'));
       inputFieldProfile.click().sendKeys('p');
       browser.sleep(500);
       inputFieldProfile.click().sendKeys('r');
       browser.sleep(500);
       inputFieldProfile.click().sendKeys('a');
       browser.sleep(500);
       inputFieldProfile.click().sendKeys('v').click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
       element.all(by.repeater('item in ac.itemList')).get(0).getText();
       
    

browser.sleep(500);      
       var inputFieldColor = element(by.css('input[name="autocompleteColor"]')),
       divElementDirectiveColor = element(by.css('.acDirectiveAutocompleteColor'));
       inputFieldColor.click().sendKeys('g')
       browser.sleep(500);
       inputFieldColor.click().sendKeys('r').click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
       browser.sleep(500);
       element.all(by.repeater('item in ac.itemList')).get(0).getText();
       expect(divElementDirectiveColor.isPresent()).toBe(true);
browser.sleep(500);
  });
});