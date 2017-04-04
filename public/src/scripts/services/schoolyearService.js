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
            return $http.get(baseURL + '/api/schoolyear/current', {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving current school year: ' + response.statusText);
                    return $q.reject('Error retrieving current school year.');
                });
        }

        function registerSchoolyear(year) {
            return $http.post(baseURL + '/api/schoolyear', year)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error posting schoolyear: ' + response.statusText);
                    return $q.reject('Error posting schoolyear.');
                });
        }

        function setCurrentYear(year) {
            return $http.put(baseURL + '/api/schoolyear/current', year)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error setting current schoolyear: ' + response.statusText);
                    return $q.reject('Error setting current schoolyear.');
                });
        }

        return {
            getAllYears: getAllYears,
            getCurrentYear: getCurrentYear,
            registerSchoolyear: registerSchoolyear,
            setCurrentYear: setCurrentYear
        };
    }

    angular.module('app')
        .factory('schoolyearService', ['notifier', '$http', '$log', schoolyearService]);

}());