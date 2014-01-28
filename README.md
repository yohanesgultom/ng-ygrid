ng-ygrid
========

Simple AngularJS directive of CRUD grid. Check [demo here](http://crosscode.tk/ng-ygrid/)

## HTML

Dependencies
```html
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">	
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>	
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>	
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js"></script>
```
Include directive js
```html
	<script src="ng-ygrid.directive.js"></script>
```
Call directive
```html
	<ng-ygrid grid="grid1"></ng-ygrid>
```

## JavaScript

Inject directive
```js
var app = angular.module('app', ['ngYgrid']);
```
Define grid in main controller
```js
app.controller('SimpleController', function ($scope, $location) {
	$scope.grid1 = {
		id: 'customer1',
		rowsData: staticData,
		rowsUrl: 'data.php',
		editUrl: 'data.php',
		cols : [
			{key: 'name', display: 'Name', type: 'text', order: 0}, 
			{key: 'city', display: 'City', type: 'select', options: {'jakarta': 'Jakarta','bandung':'Bandung','bali':'Bali'}, order: 1}
		],		
		orderBy: 'name',
		index: 'id',
		rowsPerPage: 5
	};
});
```
