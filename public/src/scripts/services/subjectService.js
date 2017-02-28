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

        return {
            getAllSubjects: getAllSubjects,
            registerSubject: registerSubject
        };
    }

    angular.module('app')
        .factory('subjectService', ['notifier', '$http', '$log', subjectService]);

}());