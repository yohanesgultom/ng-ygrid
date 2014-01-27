/**
Sample of module using ng-ygrid
**/

// include ng-ygrid in main module
var app = angular.module('app', ['ngYgrid']);

// static data example
var staticData = [{"id": "1", "name": "Customer1", "city": "jakarta"},{"id": "2", "name": "Customer2", "city": "jakarta"},{"id": "3", "name": "Customer3", "city": "jakarta"},{"id": "4", "name": "Customer4", "city": "jakarta"},{"id": "5", "name": "Customer5", "city": "jakarta"},{"id": "6", "name": "Customer6", "city": "jakarta"},{"id": "7", "name": "Customer7", "city": "jakarta"},{"id": "8", "name": "Customer8", "city": "jakarta"},{"id": "9", "name": "Customer9", "city": "jakarta"},{"id": "10", "name": "Customer10", "city": "bandung"},{"id": "11", "name": "Customer11", "city": "bandung"},{"id": "12", "name": "Customer12", "city": "bandung"},{"id": "13", "name": "Customer13", "city": "bandung"},{"id": "14", "name": "Customer14", "city": "bandung"},{"id": "15", "name": "Customer15", "city": "bandung"},{"id": "16", "name": "Customer16", "city": "bandung"},{"id": "17", "name": "Customer17", "city": "bandung"},{"id": "18", "name": "Customer18", "city": "bandung"},{"id": "19", "name": "Customer19", "city": "bandung"},{"id": "20", "name": "Customer20", "city": "bandung"}];

// main controller
app.controller('SimpleController', function ($scope, $location) {
	// ng-ygrid definition
	$scope.grid1 = {
		// (mandatory) id of the grid
		id: 'customer1',
		// (optional) static data in json format. Must include all cols defined in "cols" option
		rowsData: staticData,
		// (optional) url that will be called to retrieve data. Mandatory if data is coming from server (must followed by providing "editUrl" option)
		//rowsUrl: 'data.php',
		// (optional) url that will be called on data modification (add/edit/delete). Mandatory if data is coming from server ("rowsUrl" is provided)
		//editUrl: 'data.php',
		// (mandatory) definition of columns of data that will be displayed. keys must exist in data
		cols : [
			{key: 'name', display: 'Name', type: 'text', order: 0}, 
			{key: 'city', display: 'City', type: 'select', options: {'jakarta': 'Jakarta','bandung':'Bandung','bali':'Bali'}, order: 1}
		],		
		// (mandatory) default order col
		orderBy: 'name',
		// (mandatory) col of data expected as index (must exist in data but not necessarily defined in column)
		index: 'id',
		// (mandatory) expected number of rows per page
		rowsPerPage: 5, 
		// (optional) called before add form opened
		beforeAdd: function(form, row) {console.log('Before add:' + row)},		
		// (optional) called after add form submitted
		afterAdd: function(row) {console.log('After add:' + row)},
		// (optional) called before edit form opened
		beforeEdit: function(form, row) {console.log('Before edit:' + row)},		
		// (optional) called after edit form submitted
		afterEdit: function(row) {console.log('After edit:' + row)},		
		// (optional) called after delete confirmed
		afterDelete: function(row) {console.log('After delete:' + row)}
	};
});
