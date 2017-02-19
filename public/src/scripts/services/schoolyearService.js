(function() {
    'use strict';

    function schoolyearService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllYears() {
            return $http.get(baseURL + '/api/schoolyear')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving school year: ' + response.statusText);
                    return $q.reject('Error retrieving school year.');
                });
        }

        function getCurrentYear() {
            return $http.get(baseURL + '/api/schoolyear/current')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving current school year: ' + response.statusText);
                    return $q.reject('Error retrieving current school year.');
                });
        }

        return {
            getAllYears: getAllYears,
            getCurrentYear: getCurrentYear
        };
    }

    angular.module('app')
        .factory('schoolyearService', ['notifier', '$http', '$log', schoolyearService]);

}());