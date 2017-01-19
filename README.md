# Autocomplete
============
A simple AngularJS directive that allows you create autocomplete input text that list of the data either from a server or local variable


# installation 
============
`bower install material.autocomplte --save`
Or
`npm install material.autocomplte --save`


### Getting Started
Download the code, and include the angucomplete.js file in your page. Then add the material.autocomplte module to your Angular App file
Eg.

```html
 var module = angular.module('testing', ['material.autocomplete']);
```

### Usage 
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
        ac-input-minlength="2">
      </material-autocomplete> 
```
### Description of attributes
| Parameter | Type | Description | Binding |
| :------------- |:-------------| :----- | :-----| 
| ac-items | `expression` | An expression in the format of `item in items` to iterate over matches for your search. | = | 

# Demo 
============
1. npm install
2. bower install
3. grunt serve
