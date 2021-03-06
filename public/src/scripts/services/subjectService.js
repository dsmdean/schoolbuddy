(function() {
    'use strict';

    function subjectService(notifier, $http, $log, cacheService, $rootScope) {

        var baseURL = 'http://localhost:3000';

        function getAllSubjects() {
            return $http.get(baseURL + '/api/subjects', {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving subjects: ' + response.statusText);
                    return $q.reject('Error retrieving subjects.');
                });
        }

        function registerSubject(subject) {
            cacheService.deleteAllSubjects();
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
            cacheService.deleteAllSubjects();
            return $http.delete(baseURL + '/api/subjects/' + subjectID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting subjects: ' + response.statusText);
                    return $q.reject('Error deleting subjects.');
                });
        }

        function addSubjectsToClassroom(classroomID, subjects) {
            cacheService.deleteClassroomSubjects();
            // update local classroom data
            return $http.put(baseURL + '/api/classrooms/' + classroomID + '/subjects', subjects)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error adding subjects to classroom: ' + response.statusText);
                    return $q.reject('Error adding subjects to classroom.');
                });
        }

        function deleteSubjectsFromClassroom(classroomID, subjects) {
            cacheService.deleteClassroomSubjects();
            // update local classroom data
            return $http.put(baseURL + '/api/classrooms/' + classroomID + '/subjects/delete', subjects)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting subjects from classroom: ' + response.statusText);
                    return $q.reject('Error deleting subjects from classroom.');
                });
        }

        return {
            getAllSubjects: getAllSubjects,
            registerSubject: registerSubject,
            deleteSubject: deleteSubject,
            addSubjectsToClassroom: addSubjectsToClassroom,
            deleteSubjectsFromClassroom: deleteSubjectsFromClassroom
        };
    }

    angular.module('app')
        .factory('subjectService', ['notifier', '$http', '$log', 'cacheService', '$rootScope', subjectService]);

}());