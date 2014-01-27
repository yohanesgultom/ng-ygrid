/** 
    ng-ygrid : CRUD grid directive
    author : Yohanes Gultom
**/

var app = angular.module('ngYgrid', []);

app.directive('ngYgrid', function() {

    return {
      restrict: 'E',
      replace: true,
      scope: {        
        grid: '='
      },
      template: '<div id="grid-{{grid.id}}" class="grid"> <style type="text/css"> table.table tr.selected td {background-color: #F5F1D3; } </style> <!-- table --> <table class="table table-striped table-bordered"> <thead> <tr> <th ng-repeat="col in grid.cols | orderBy:\'order\'">{{col.display}}</th> </tr> </thead> <tbody> <tr id="row-{{row[grid.index]}}" class="grid-row" ng-repeat="row in grid.rows | orderBy: grid.orderBy" ng-class-odd="\'odd\'" ng-class-even="\'even\'" ng-click="selectRow(row)"> <td ng-repeat="col in grid.cols | orderBy:\'order\'"> <span ng-if="!col.options">{{row[col.key]}}</span> <span ng-if="col.options">{{col.options[row[col.key]]}}</span> </td> </tr> </tbody> </table> <!-- toolbar --> <div class="grid-toolbar"> <div class="btn-group btn-group"> <button type="button" class="btn btn-default btn-add" ng-click="addRow()">Add</button> <button type="button" class="btn btn-default btn-edit" ng-click="editRow()">Edit</button> <button type="button" class="btn btn-default btn-delete" ng-click="deleteRow()">Delete</button> </div> <div class="pull-right"> <ul class="pagination" style="margin:0"> <li class="previous"><a href="#" ng-click="prevPage()">&laquo;</a></li> <li class="page" ng-repeat="n in getTimes(grid.totalPage) track by $index"> <a href="#" ng-click="openPage($index+1)">{{$index+1}}</a> </li> <li class="next"><a href="#" ng-click="nextPage()">&raquo;</a></li> </ul> </div> </div> <!-- add modal --> <div class="modal fade" id="grid-modal-add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="myModalLabel">New {{ grid.id | uppercase}}</h4> </div> <div class="modal-body"> <div class="form" role="form"> <div ng-repeat="col in grid.cols | orderBy:\'order\'" class="form-group"> <label for="{{col.key}}">{{col.display}}</label> <input ng-if="!col.type || col.type == \'text\'" id="{{col.key}}" type="text" class="input-sm form-control" ng-model="newRow[col.key]" /> <select ng-if="col.type == \'select\'" id="{{col.key}}" class="input-sm form-control" ng-model="newRow[col.key]"> <option ng-repeat="(k,v) in col.options" value="{{k}}">{{v}}</option> </select> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button> <button type="button" class="btn btn-primary" ng-click="saveRow()"><span class="glyphicon glyphicon-ok"></span> Add</button> </div> </div> </div> </div> <!-- edit modal --> <div class="modal fade" id="grid-modal-edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="myModalLabel">Edit {{grid.id | uppercase}}</h4> </div> <div class="modal-body"> <div class="form" role="form"> <div ng-repeat="col in grid.cols | orderBy:\'order\'" class="form-group"> <label for="{{col.key}}">{{col.display}}</label> <input ng-if="!col.type || col.type == \'text\'" id="{{col.key}}" type="text" class="input-sm form-control" ng-model="selectedRow[col.key]" /> <select ng-if="col.type == \'select\'" id="{{col.key}}" class="input-sm form-control" ng-model="selectedRow[col.key]"> <option ng-repeat="(k,v) in col.options" value="{{k}}">{{v}}</option> </select> <!-- TODO support other type of input: radio, check, datepicker, file .etc --> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button> <button type="button" class="btn btn-primary" ng-click="saveRow()"><span class="glyphicon glyphicon-ok"></span> Save</button> </div> </div> </div> </div> </div>',      
      //templateUrl: 'template.html',
      controller: function($scope, $element, $http) {        

        $scope.getTimes = function(n) {
          return new Array(n);
        }

        $scope.openPage = function(page) {
          if ($scope.grid.rowsUrl) {
            // load from server
            $http.get($scope.grid.rowsUrl, {params: {page: page, rowperpage: $scope.grid.rowsPerPage}}).success(function(response) {
              $scope.grid.rows = response.rows;  
              $scope.grid.page = response.page;
              $scope.grid.total = response.total;
              $scope.grid.totalPage = Math.ceil($scope.grid.total / $scope.grid.rowsPerPage);
              $('.pagination li.page a', $element).parent().removeClass('active');
              $('.pagination li.page a:contains("' + $scope.grid.page + '")', $element).parent().addClass('active');
            }); 
          } else if ($scope.grid.rowsData) {
            // load from static data
            $scope.grid.page = page;
            $scope.grid.total = $scope.grid.rowsData.length;
            $scope.grid.totalPage = Math.ceil($scope.grid.total / $scope.grid.rowsPerPage);
            var start = 0;
            var end = $scope.grid.total;
            if (page > $scope.grid.totalPage) {
              start = 0;
              end = -1;
            } else {
              start = ($scope.grid.rowsPerPage * (page-1));
              end = start + $scope.grid.rowsPerPage - 1;
              end = (end >= $scope.grid.total) ? $scope.grid.total-1 : end;     
            }

            $scope.grid.rows = [];
            for (var i = start; i <= end; i++) {
              $scope.grid.rows.push($scope.grid.rowsData[i]);
            }

            $('.pagination li.page a', $element).parent().removeClass('active');
            $('.pagination li.page a:contains("' + $scope.grid.page + '")', $element).parent().addClass('active');
          } else {
            console.log('No datasource provided');
          } 
        }

        $scope.prevPage = function() {
          if ($scope.grid.page > 1) {
            $scope.openPage($scope.grid.page - 1);
          }
        }

        $scope.nextPage = function() {
          if ($scope.grid.page < $scope.grid.totalPage) {
            $scope.openPage($scope.grid.page + 1);
          }
        }


        $scope.selectRow = function(row) {
          if($('#row-'+row[$scope.grid.index]).hasClass('selected')) {
            // unselect
            $scope.selectedRow = null;
            $('tr', $element).removeClass('selected');            
          } else {
            // select
            $scope.selectedRow = row;
            $('tr', $element).removeClass('selected');
            $('#row-'+row[$scope.grid.index]).addClass('selected');
          }
        };

        // show add form
        $scope.addRow = function() {                  
          $scope.newRow = {};             
          // callback
          if ($scope.grid.beforeAdd) $scope.grid.beforeAdd($element, $scope.newRow);             
          $scope.selectedRow = null;                
          $('tr', $element).removeClass('selected');
          $('#grid-modal-add', $element).modal('show');          
        };

        // show edit form
        $scope.editRow = function() {
          $scope.newRow = null;
          if ($scope.selectedRow) {
            // callback
            if ($scope.grid.beforeEdit) $scope.grid.beforeEdit($element, $scope.selectedRow);
            $('#grid-modal-edit', $element).modal('show');
          }          
        };

        // delete row
        $scope.deleteRow = function() {
          if ($scope.selectedRow) {
            if (confirm('Delete selected row?')) {
              // callback
              if ($scope.grid.afterDelete) $scope.grid.afterDelete($scope.selectedRow);
              if ($scope.grid.editUrl) {
                // server data
                $http.post($scope.grid.editUrl, {action: 'delete', data: $scope.selectedRow}).success(function (response) {
                    console.log(response);
                });    
              } else {  
                  $('tr', $element).removeClass('selected');
                  for (var i = 0; i < $scope.grid.rowsData.length; i++) {
                    if ($scope.grid.rowsData[i][$scope.grid.index] == $scope.selectedRow[$scope.grid.index]) {
                      $scope.grid.rowsData.splice(i, 1);
                      break;
                    }
                  }
              }
              // refresh
              $scope.openPage(1);                            
            }
          }
        };

        // save row
        $scope.saveRow = function() {
          if ($scope.newRow) {
            // callback
            if ($scope.grid.afterAdd) $scope.grid.afterAdd($scope.newRow);
            if ($scope.grid.editUrl) {
              // server data
              $http.post($scope.grid.editUrl, {action: 'add', data: $scope.newRow}).success(function (response) {
                console.log(response);
              });  
            } else {
              // static data
              $scope.newRow[$scope.grid.index] = $scope.grid.rowsData.length + 1;
              $scope.grid.rowsData.push($scope.newRow);              
            }
            $('#grid-modal-add', $element).modal('hide'); 
          } else if ($scope.selectedRow) {
            // callback
            if ($scope.grid.afterEdit) $scope.grid.afterEdit($scope.selectedRow);            
            if ($scope.grid.editUrl) {
              // server data
              $http.post($scope.grid.editUrl, {action: 'edit', data: $scope.selectedRow}).success(function (response) {
                console.log(response);
              });  
            } else {
              // static data
              for (row in $scope.grid.rowsData) {
                if (row[$scope.grid.index] == $scope.selectedRow[$scope.grid.index]) {
                  for (col in $scope.grid.cols) {
                    row[col] = $scope.selectedRow[col];
                  }
                  break;
                }
              }
            }
            $('#grid-modal-edit', $element).modal('hide'); 
          } 
          // refresh
          $scope.openPage($scope.grid.page);                                     
        }

        // init
        $scope.openPage(1);

      }
    }
  });