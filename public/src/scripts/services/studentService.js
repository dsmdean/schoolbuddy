(function() {
    'use strict';

    function studentService(notifier, $http, $log, cacheService, $rootScope) {

        var baseURL = 'http://localhost:3000';

        function getAllStudents() {
            return $http.get(baseURL + '/api/students', {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving students: ' + response.statusText);
                    return $q.reject('Error retrieving students.');
                });
        }

        function getStudentsBySchool(schoolID) {
            $rootScope.schoolID = schoolID;
            return $http.get(baseURL + '/api/students/school/' + schoolID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving students: ' + response.statusText);
                    return $q.reject('Error retrieving students.');
                });
        }

        function getStudentByUserId(userID) {
            $rootScope.userID = userID;
            return $http.get(baseURL + '/api/students/admin/' + userID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving student: ' + response.statusText);
                    return $q.reject('Error retrieving student.');
                });
        }

        function getStudentsBySchoolGradeNotInClass(schoolID, grade) {
            return $http.get(baseURL + '/api/students/school/' + schoolID + '/grade/' + grade)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving students: ' + response.statusText);
                    return $q.reject('Error retrieving students.');
                });
        }

        function registerStudent(newStudent) {
            cacheService.deleteStudentsBySchool();
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
            cacheService.deleteStudentByUserId();
            // update local student data
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
            cacheService.deleteStudentsBySchool();
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
            cacheService.deleteStudentsBySchool();
            return $http.put(baseURL + '/api/students/' + studentID + '/suspend')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error suspending student: ' + response.statusText);
                    return $q.reject('Error suspending student.');
                });
        }

        function getStudentGrades(studentID, classroomID) {
            $rootScope.studentID = studentID;
            $rootScope.classroomID = classroomID;
            return $http.get(baseURL + '/api/students/' + studentID + '/grades/classroom/' + classroomID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error getting student grades: ' + response.statusText);
                    return $q.reject('Error getting student grades.');
                });
        }

        return {
            getAllStudents: getAllStudents,
            getStudentsBySchool: getStudentsBySchool,
            getStudentByUserId: getStudentByUserId,
            registerStudent: registerStudent,
            getStudentsBySchoolGradeNotInClass: getStudentsBySchoolGradeNotInClass,
            updateStudent: updateStudent,
            deleteStudent: deleteStudent,
            suspendStudent: suspendStudent,
            getStudentGrades: getStudentGrades
        };
    }

    angular.module('app')
        .factory('studentService', ['notifier', '$http', '$log', 'cacheService', '$rootScope', studentService]);

}());