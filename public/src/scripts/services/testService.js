(function() {
    'use strict';

    function testService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllTests() {
            return $http.get(baseURL + '/api/tests')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving tests: ' + response.statusText);
                    return $q.reject('Error retrieving tests.');
                });
        }

        function registerTest(newTest) {
            return $http.post(baseURL + '/api/tests', newTest)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error posting tests: ' + response.statusText);
                    return $q.reject('Error posting tests.');
                });
        }

        return {
            getAllTests: getAllTests,
            registerTest: registerTest
        };
    }

    angular.module('app')
        .factory('testService', ['notifier', '$http', '$log', testService]);

}());