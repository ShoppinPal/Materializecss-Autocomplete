# Autocomplete
============
A simple AngularJS directive that allows you create autocomplete input text that list of the data either from a server or local variable

To see a demo go here: https://shoppinpalautocomplete.herokuapp.com/#/auto

Features:
* custom template support.
* can show suggestion as a hint .
* keyboard and mouse control.
* works in legacy browsers.
* Auto match.
* Clear on selection: when you select an item, input field is cleared.
* custom selection of the templete ```simpleTemplete``` , ```profileTemplete``` and ```colorTemplate```.
* Blur event handling.
* Show scrollbar.
* Show all items.
* input minimum length to display ```itemList```.

**Requirements:** AngularJS **1.4.x**

# installation 
============
### Getting Started
Download the code, and include the autocomplete.min.js file in your page. Then add the material.autocomplte module to your Angular App file

**1. Download via npm or bower**


`bower install materialized.autocomplete --save`
Or
`npm install materialized.autocomplete --save`

**2. Link the files in the page header**

For bower installation:

```html
<script src="bower_components/materialized.autocomplete/autocomplete/autocomplete.min.js"></script>
<link rel="stylesheet" href="bower_components/materialized.autocomplete/autocomplete/css/autocomplete.min.css">
```

For npm installation

```html
<script src="node_modules/materialized.autocomplete/autocomplete/autocomplete.min.js"></script>
<link rel="stylesheet" href="node_modules/materialized.autocomplete/autocomplete/css/autocomplete.min.css">
```

**3. Include the module as a dependency in your app**

```javascript
 var module = angular.module('testing', ['material.autocomplete']);
```
###Methods


### Remote Usage 

For the simple Autocomplete template 
```html
      <material-autocomplete
        ac-input-name="Products"
        ac-items="test.productList"
        ac-selected-item="test.dataResultprod"
        ac-display-property="name"
        ac-selected-item-change="test.fetchProductList(test.productList)"
        ac-search-text="test.searchTextProduct"
        ac-remote-method="test.fetchDataFromServer(test.searchTextProduct)"
        ac-place-holder=" &#128269; &nbsp; &nbsp; Search the items here...."
        ac-min-length="2">
      </material-autocomplete> 
```

Demo screenShots:


![screen shot 2017-01-25 at 1 21 51 am](https://cloud.githubusercontent.com/assets/24220012/22264264/5afdb872-e29d-11e6-99cf-6e53d0de925d.png)
![screen shot 2017-01-25 at 1 20 59 am](https://cloud.githubusercontent.com/assets/24220012/22264262/57b14ec2-e29d-11e6-9e83-7f331223172a.png)
![screen shot 2017-01-25 at 1 21 34 am](https://cloud.githubusercontent.com/assets/24220012/22264263/591adb70-e29d-11e6-9862-8ca586b82cd0.png)
![screen shot 2017-01-25 at 1 22 20 am](https://cloud.githubusercontent.com/assets/24220012/22264273/5fc74378-e29d-11e6-9728-1da41b3bde49.png)
![screen shot 2017-01-25 at 1 37 23 am](https://cloud.githubusercontent.com/assets/24220012/22264679/e1f3af48-e29e-11e6-962a-9895cbf00b14.png)

### Local Usage 
###For the color Autocomplete template 

```html
      <material-autocomplete
        ac-input-name="color"
        ac-items="test.color"
        ac-display-property="name"
        ac-display-color="color"
        ac-search-text="test.searchCol"
        ac-min-length="1"
        ac-place-holder=" &#128269; &nbsp; &nbsp; Color Autocomplete "
        ac-template-style="colorTemplate">
      </material-autocomplete>
```
Demo screenShots:


![screen shot 2017-02-15 at 7 18 35 pm](https://cloud.githubusercontent.com/assets/24220012/22977171/960f7f5a-f3b3-11e6-8dd1-5e26edf6c1b9.png)
![screen shot 2017-02-15 at 7 20 09 pm](https://cloud.githubusercontent.com/assets/24220012/22977242/d22e31ac-f3b3-11e6-8fcf-add52b2d1f62.png)

###For the profile Autocomplete template 
```html
      <material-autocomplete
        ac-input-name="people"
        ac-items="test.people"
        ac-display-property="name"
        ac-display-email="email"
        ac-display-picture="picture"
        ac-search-text="test.searchPeople"
        ac-min-length="1"
        ac-place-holder=" &#128269; &nbsp; &nbsp; Profile Autocomplete "
        ac-template-style="profileTemplate">
      </material-autocomplete>

```
Demo screenShots:

![screen shot 2017-02-15 at 7 22 01 pm](https://cloud.githubusercontent.com/assets/24220012/22977303/1835d380-f3b4-11e6-8e53-71dc0e99f2b0.png)
![screen shot 2017-02-15 at 7 23 38 pm](https://cloud.githubusercontent.com/assets/24220012/22977351/4bc7412a-f3b4-11e6-8e92-591336228130.png)
![screen shot 2017-02-15 at 7 24 43 pm](https://cloud.githubusercontent.com/assets/24220012/22977377/6fdb079a-f3b4-11e6-9109-4f644a2f5039.png)



### Description of attributes
| Parameter | Type | Description | 
| :------------- |:-------------| :----- | 
| ac-items | `expression` | An expression in the format of `item in items` to iterate over matches for your search. |
|ac-input-name|`string`|The name attribute given to the input element to be used with FormControlle.|
|ac-selected-item|`object`| A model to be bind which is selected item.|
|ac-display-property|`string`|  item diaplay use property name |
|ac-display-email|`string`| item diaplay use property email |
|ac-display-picture|`string`| item diaplay use property picture|
|ac-display-color|`string`|A list of the item diaplay for the color code|
|ac-selected-item-change|`expression`|An expression to be run each time a new item is selected.|
|ac-search-text|`expression`| A model to bind the search query text to |
|ac-remote-method|`expression`|Handle the searchText result and provide the result|
|ac-place-holder|`string`|Secondary Placeholder text that will display after label move|
|ac-show-input-name|`string`|Input text for the hiding secondary palceholder|
|ac-dropdown-items|`expression`|For the calculate dropdown height |
|ac-clear-button|`expression`|Clear the inputtext if selected value is there|
|ac-min-length|`number`|Specifies the minimum length of text before autocomplete will make suggestions|



### Running test suite

In order to run tests clone repository and run following commands within
repo's directory:

```
1. npm install
2. bower install
3. grunt
```

