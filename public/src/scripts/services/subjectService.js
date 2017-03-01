(function() {
    'use strict';

    function subjectService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllSubjects() {
            return $http.get(baseURL + '/api/subjects')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving subjects: ' + response.statusText);
                    return $q.reject('Error retrieving subjects.');
                });
        }

        function registerSubject(subject) {
            return $http.post(baseURL + '/api/subjects', subject)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error saving subjects: ' + response.statusText);
                    return $q.reject('Error saving subjects.');
                });
        }

        function deleteSubject(subjectID) {
            return $http.delete(baseURL + '/api/subjects/' + subjectID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting subjects: ' + response.statusText);
                    return $q.reject('Error deleting subjects.');
                });
        }

        return {
            getAllSubjects: getAllSubjects,
            registerSubject: registerSubject,
            deleteSubject: deleteSubject
        };
    }

    angular.module('app')
        .factory('subjectService', ['notifier', '$http', '$log', subjectService]);

}());