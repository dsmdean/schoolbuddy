(function() {
    'use strict';

    function teacherService(notifier, $http, $log, cacheService, $rootScope) {

        var baseURL = 'http://localhost:3000';

        function getAllTeachers() {
            return $http.get(baseURL + '/api/teachers', {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teachers: ' + response.statusText);
                    return $q.reject('Error retrieving teachers.');
                });
        }

        function getTeachersBySchool(schoolID) {
            $rootScope.schoolID = schoolID;
            return $http.get(baseURL + '/api/teachers/school/' + schoolID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teachers: ' + response.statusText);
                    return $q.reject('Error retrieving teachers.');
                });
        }

        function getTeacherByUserId(userID) {
            $rootScope.userID = userID;
            return $http.get(baseURL + '/api/teachers/admin/' + userID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving teacher: ' + response.statusText);
                    return $q.reject('Error retrieving teacher.');
                });
        }

        function registerTeacher(newTeacher) {
            cacheService.deleteTeachersBySchool();
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
            cacheService.deleteTeachersBySchool();
            // update local teacher data
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
            cacheService.deleteTeachersBySchool();
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
            cacheService.deleteTeachersBySchool();
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
        .factory('teacherService', ['notifier', '$http', '$log', 'cacheService', '$rootScope', teacherService]);

}());