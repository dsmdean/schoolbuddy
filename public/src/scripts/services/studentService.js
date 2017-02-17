(function() {
    'use strict';

    function studentService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllStudents(schoolID) {
            return $http.get(baseURL + '/api/students/school/' + schoolID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving students: ' + response.statusText);
                    return $q.reject('Error retrieving students.');
                });
        }

        function getStudentByUserId(userID) {
            return $http.get(baseURL + '/api/students/admin/' + userID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving student: ' + response.statusText);
                    return $q.reject('Error retrieving student.');
                });
        }

        function registerStudent(newStudent) {
            return $http.post(baseURL + '/api/students', newStudent)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error registering student: ' + response.statusText);
                    return $q.reject('Error registering student.');
                });
        }

        function updateStudent(student) {
            return $http.put(baseURL + '/api/students/' + student._id, student)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating student: ' + response.statusText);
                    return $q.reject('Error updating student.');
                });
        }

        function deleteStudent(studentID) {
            return $http.delete(baseURL + '/api/students/' + studentID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting student: ' + response.statusText);
                    return $q.reject('Error deleting student.');
                });
        }

        function suspendStudent(studentID) {
            return $http.put(baseURL + '/api/students/' + studentID + '/suspend')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error suspending student: ' + response.statusText);
                    return $q.reject('Error suspending student.');
                });
        }

        return {
            getAllStudents: getAllStudents,
            getStudentByUserId: getStudentByUserId,
            registerStudent: registerStudent,
            updateStudent: updateStudent,
            deleteStudent: deleteStudent,
            suspendStudent: suspendStudent
        };
    }

    angular.module('app')
        .factory('studentService', ['notifier', '$http', '$log', studentService]);

}());