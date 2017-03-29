(function() {
    'use strict';

    function schoolService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllSchools() {
            return $http.get(baseURL + '/api/schools')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving schools: ' + response.statusText);
                    return $q.reject('Error retrieving schools.');
                });
        }

        function getSchoolByUserId(userID) {
            return $http.get(baseURL + '/api/schools/admin/' + userID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving school: ' + response.statusText);
                    return $q.reject('Error retrieving school.');
                });
        }

        function registerSchool(newSchool) {
            return $http.post(baseURL + '/api/schools', newSchool)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error registering school: ' + response.statusText);
                    return $q.reject('Error registering school.');
                });
        }

        function updateSchool(school) {
            return $http.put(baseURL + '/api/schools/' + school._id, school)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating school: ' + response.statusText);
                    return $q.reject('Error updating school.');
                });
        }

        function deleteSchool(schoolID) {
            return $http.delete(baseURL + '/api/schools/' + schoolID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting school: ' + response.statusText);
                    return $q.reject('Error deleting school.');
                });
        }

        function suspendSchool(schoolID) {
            return $http.put(baseURL + '/api/schools/' + schoolID + '/suspend')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error suspending school: ' + response.statusText);
                    return $q.reject('Error suspending school.');
                });
        }

        return {
            getAllSchools: getAllSchools,
            getSchoolByUserId: getSchoolByUserId,
            registerSchool: registerSchool,
            updateSchool: updateSchool,
            deleteSchool: deleteSchool,
            suspendSchool: suspendSchool
        };
    }

    angular.module('app')
        .factory('schoolService', ['notifier', '$http', '$log', schoolService]);

}());