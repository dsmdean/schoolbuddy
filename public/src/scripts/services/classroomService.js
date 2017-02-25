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
            return $http.get(baseURL + '/api/classrooms/teacher/' + teacherID + '/' + year)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classroom: ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                });
        }

        function getClassroomByID(classroomID) {
            return $http.get(baseURL + '/api/classrooms/' + classroomID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classroom: ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                });
        }

        function addStudentsToClassroom(classroomID, students) {
            return $http.put(baseURL + '/api/classrooms/' + classroomID + '/students', students)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error adding students to classroom: ' + response.statusText);
                    return $q.reject('Error adding students to classroom.');
                });
        }

        function deleteStudentsFromClassroom(classroomID, students) {
            return $http.put(baseURL + '/api/classrooms/' + classroomID + '/students/delete', students)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting students from classroom: ' + response.statusText);
                    return $q.reject('Error deleting students from classroom.');
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
            getClassroomByID: getClassroomByID,
            addStudentsToClassroom: addStudentsToClassroom,
            deleteStudentsFromClassroom: deleteStudentsFromClassroom,
            registerClassroom: registerClassroom,
            updateClassroom: updateClassroom,
            deleteClassroom: deleteClassroom
        };
    }

    angular.module('app')
        .factory('classroomService', ['notifier', '$http', '$log', classroomService]);

}());