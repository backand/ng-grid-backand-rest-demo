'use strict';

angular.module('angularGruntSeed')
    .factory('BackandService', ['$http', '$q',
        function($http, $q) {
            var backandGlobalUrl = 'https://api.backand.com:8080';

            function toQueryString(obj) {
                var parts = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                    }
                }
                return parts.join('&');
            }

            function authenticate() {

                var deferred = $q.defer();

                var data = toQueryString({
                    grant_type: 'password',
                    username: '',
                    password: '',
                    appname: 'restdemo',
                });

                var request = $http({
                    method: 'POST',
                    url: backandGlobalUrl + '/token',
                    data: data,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                request.then(function(response){
                    var authToken = response.data.token_type + ' ' + response.data.access_token;
                    $http.defaults.headers.common.Authorization = authToken;
                    deferred.resolve(authToken);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function createEmployee(body) {

                var request = $http({
                    method: 'POST',
                    data: body,
                    url: backandGlobalUrl + '/1/view/data/Employees'
                });

                return sendRequest(request);
            }

            function getEmployees() {

                var request = $http({
                    method: 'GET',
                    url: backandGlobalUrl + '/1/view/data/Employees'
                });

                return sendRequest(request);
            }

            function updateEmployee(id, body) {

                var request = $http({
                    method: 'PUT',
                    data: body,
                    url: backandGlobalUrl + '/1/view/data/Employees/' + id
                });

                return sendRequest(request);
            }

            function deleteEmployee(id) {

                var request = $http({
                    method: 'DELETE',
                    url: backandGlobalUrl + '/1/view/data/Employees/' + id
                });

                return sendRequest(request);
            }

            function sendRequest(config){

                var deferred = $q.defer();

                config.then(function(response){
                    deferred.resolve(response);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                authenticate: authenticate,
                createEmployee: createEmployee,
                getEmployees: getEmployees,
                updateEmployee: updateEmployee,
                deleteEmployee: deleteEmployee
            };
        }
    ]);
