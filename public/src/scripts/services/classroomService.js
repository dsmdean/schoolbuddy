(function() {
    'use strict';

    function classroomService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllClassrooms() {
            return $http.get(baseURL + '/api/classrooms')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                });
        }

        function getClassroomsBySchool(schoolID) {
            return $http.get(baseURL + '/api/classrooms/school/' + schoolID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                });
        }

        function getClassroomByTeacher(teacherID, year) {
            return $http.get(baseURL + '/api/classrooms/admin/' + teacherID + '/' + year)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classroom: ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                });
        }

        function registerClassroom(newClassroom) {
            return $http.post(baseURL + '/api/classrooms', newClassroom)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error registering classroom: ' + response.statusText);
                    return $q.reject('Error registering classroom.');
                });
        }

        function updateClassroom(classroom) {
            return $http.put(baseURL + '/api/classrooms/' + classroom._id, classroom)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating classroom: ' + response.statusText);
                    return $q.reject('Error updating classroom.');
                });
        }

        function deleteClassroom(classroomID) {
            return $http.delete(baseURL + '/api/classrooms/' + classroomID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting classroom: ' + response.statusText);
                    return $q.reject('Error deleting classroom.');
                });
        }

        return {
            getAllClassrooms: getAllClassrooms,
            getClassroomsBySchool: getClassroomsBySchool,
            getClassroomByTeacher: getClassroomByTeacher,
            registerClassroom: registerClassroom,
            updateClassroom: updateClassroom,
            deleteClassroom: deleteClassroom
        };
    }

    angular.module('app')
        .factory('classroomService', ['notifier', '$http', '$log', classroomService]);

}());