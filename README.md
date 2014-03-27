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
Example of using static datasource to define the grid
```js

var staticData = [
{"id": "1", "name": "Customer1", "city": "jakarta"},
{"id": "2", "name": "Customer2", "city": "jakarta"},
{"id": "3", "name": "Customer3", "city": "jakarta"},
{"id": "4", "name": "Customer4", "city": "jakarta"},
{"id": "5", "name": "Customer5", "city": "jakarta"},
{"id": "6", "name": "Customer6", "city": "jakarta"},
{"id": "7", "name": "Customer7", "city": "jakarta"},
{"id": "8", "name": "Customer8", "city": "jakarta"},
{"id": "9", "name": "Customer9", "city": "jakarta"},
{"id": "10", "name": "Customer10", "city": "bandung"},
{"id": "11", "name": "Customer11", "city": "bandung"},
{"id": "12", "name": "Customer12", "city": "bandung"},
{"id": "13", "name": "Customer13", "city": "bandung"},
{"id": "14", "name": "Customer14", "city": "bandung"},
{"id": "15", "name": "Customer15", "city": "bandung"},
{"id": "16", "name": "Customer16", "city": "bandung"},
{"id": "17", "name": "Customer17", "city": "bandung"},
{"id": "18", "name": "Customer18", "city": "bandung"},
{"id": "19", "name": "Customer19", "city": "bandung"},
{"id": "20", "name": "Customer20", "city": "bandung"}
];

app.controller('SimpleController', function ($scope, $location) {
	$scope.grid1 = {
		id: 'customer1',
		rowsData: staticData,
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
Example of using remote datasource to define the grid
```js

app.controller('SimpleController', function ($scope, $location) {
	$scope.grid1 = {
		id: 'customer1',
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
The `rowsUrl` is expecting JSON request/response with below structure 

Request:
```
{
	"page":1, // page to be retrieved
	"rowperpage":10 // number of rows per page
}
```

Response:
```
{
	"rows":
		[
			{"id": "1", "name": "Customer1", "city": "jakarta"},
			{"id": "2", "name": "Customer2", "city": "jakarta"},
			{"id": "3", "name": "Customer3", "city": "jakarta"},
			{"id": "4", "name": "Customer4", "city": "jakarta"},
			{"id": "5", "name": "Customer5", "city": "jakarta"},
			{"id": "6", "name": "Customer6", "city": "jakarta"},
			{"id": "7", "name": "Customer7", "city": "jakarta"},
			{"id": "8", "name": "Customer8", "city": "jakarta"},
			{"id": "9", "name": "Customer9", "city": "jakarta"},
		],
	"total":20,
	"page":1		
}
```

The `editUrl` is expecting below structure

Request:
```
{
	"action":"add", // value: add/edit/delete
	// depends on data 
	"id":1,
	"name":"Customer New",
	"city":"Denpasar"
}
```
Response:
```
{
	"response_code":"add success", 
	"message":"Data is added successfully"
}
```
