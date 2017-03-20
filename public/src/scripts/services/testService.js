(function() {
    'use strict';

    function testService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllTests() {
            return $http.get(baseURL + '/api/tests')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving tests: ' + response.statusText);
                    return $q.reject('Error retrieving tests.');
                });
        }

        function registerTest(newTest) {
            return $http.post(baseURL + '/api/tests', newTest)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error posting tests: ' + response.statusText);
                    return $q.reject('Error posting tests.');
                });
        }

        function getTestById(testId) {
            return $http.get(baseURL + '/api/tests/' + testId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving test: ' + response.statusText);
                    return $q.reject('Error retrieving test.');
                });
        }

        function getTestByClassroom(classroomId) {
            return $http.get(baseURL + '/api/tests/classroom/' + classroomId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving test: ' + response.statusText);
                    return $q.reject('Error retrieving test.');
                });
        }

        function updateTest(newTest) {
            return $http.put(baseURL + '/api/tests/' + newTest._id, newTest)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating test: ' + response.statusText);
                    return $q.reject('Error updating test.');
                });
        }

        function deleteTest(testID) {
            return $http.delete(baseURL + '/api/tests/' + testID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting test: ' + response.statusText);
                    return $q.reject('Error deleting test.');
                });
        }

        function gradeTest(grades) {
            return $http.post(baseURL + '/api/students/grade', grades)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error grading test: ' + response.statusText);
                    return $q.reject('Error grading test.');
                });
        }

        return {
            getAllTests: getAllTests,
            registerTest: registerTest,
            getTestById: getTestById,
            getTestByClassroom: getTestByClassroom,
            updateTest: updateTest,
            deleteTest: deleteTest,
            gradeTest: gradeTest
        };
    }

    angular.module('app')
        .factory('testService', ['notifier', '$http', '$log', testService]);

}());