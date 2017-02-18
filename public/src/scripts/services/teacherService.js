(function() {
    'use strict';

    function teacherService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllTeachers() {
            return $http.get(baseURL + '/api/teachers')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teachers: ' + response.statusText);
                    return $q.reject('Error retrieving teachers.');
                });
        }

        function getTeachersBySchool(schoolID) {
            return $http.get(baseURL + '/api/teachers/school/' + schoolID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teachers: ' + response.statusText);
                    return $q.reject('Error retrieving teachers.');
                });
        }

        function getTeacherByUserId(userID) {
            return $http.get(baseURL + '/api/teachers/admin/' + userID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teacher: ' + response.statusText);
                    return $q.reject('Error retrieving teacher.');
                });
        }

        function registerTeacher(newTeacher) {
            return $http.post(baseURL + '/api/teachers', newTeacher)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error registering teacher: ' + response.statusText);
                    return $q.reject('Error registering teacher.');
                });
        }

        function updateTeacher(teacher) {
            return $http.put(baseURL + '/api/teachers/' + teacher._id, teacher)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating teacher: ' + response.statusText);
                    return $q.reject('Error updating teacher.');
                });
        }

        function deleteTeacher(teacherID) {
            return $http.delete(baseURL + '/api/teachers/' + teacherID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting teacher: ' + response.statusText);
                    return $q.reject('Error deleting teacher.');
                });
        }

        function suspendTeacher(teacherID) {
            return $http.put(baseURL + '/api/teachers/' + teacherID + '/suspend')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error suspending teacher: ' + response.statusText);
                    return $q.reject('Error suspending teacher.');
                });
        }

        return {
            getAllTeachers: getAllTeachers,
            getTeachersBySchool: getTeachersBySchool,
            getTeacherByUserId: getTeacherByUserId,
            registerTeacher: registerTeacher,
            updateTeacher: updateTeacher,
            deleteTeacher: deleteTeacher,
            suspendTeacher: suspendTeacher
        };
    }

    angular.module('app')
        .factory('teacherService', ['notifier', '$http', '$log', teacherService]);

}());