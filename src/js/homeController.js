'use strict';

angular.module('angularGruntSeed')
.controller('HomeController', ['$scope', 'BackandService',
    function($scope, backandService) {

        $scope.selectedRows = [];

        var initializeGrid = function(){
            backandService.authenticate().then(function(token){
                getEmployees();
            });
        };

        var getEmployees = function(){
            backandService.getEmployees().then(function(employees){
                $scope.employees = employees.data.data;
            });
            $scope.selectedRows.length = 0;
        };

        $scope.deleteItems = function(){
            for (var i = $scope.selectedRows.length - 1; i >= 0; i--) {
                backandService.deleteEmployee($scope.selectedRows[i].ID).then(function(data){
                    getEmployees();
                });
            }
        };

        $scope.addNewRow = function(){
            $scope.employees.push({ID: null});
        };

        $scope.$on('ngGridEventEndCellEdit', function(evt){
            if(evt.targetScope.row.entity.ID === null){
                backandService.createEmployee(evt.targetScope.row.entity).then(function(data){
                    getEmployees();
                });
            } else {
                var payload = {
                    'ID': evt.targetScope.row.entity.ID,
                    'First_Name': evt.targetScope.row.entity.First_Name,
                    'Last_Name': evt.targetScope.row.entity.Last_Name,
                };
                backandService.updateEmployee(evt.targetScope.row.entity.ID, payload).then(function(data){
                    getEmployees();
                });
            }
        });

        $scope.gridOptions = {
            data: 'employees',
            enableRowSelection: true,
            enableCellEditOnFocus: true,
            showSelectionCheckbox: true,
            selectedItems:$scope.selectedRows,
            columnDefs: [{
                field: 'ID',
                displayName: 'Id',
                enableCellEdit: false
            }, {
                field: 'First_Name',
                displayName: 'First Name',
                enableCellEdit: true
            }, {
                field: 'Last_Name',
                displayName: 'Last Name',
                enableCellEdit: true
            }]
        };

        initializeGrid();
    }
]);
