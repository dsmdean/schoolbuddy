(function() {
    'use strict';

    function cacheService($cacheFactory, $rootScope) {

        var baseURL = 'http://localhost:3000';

        function deleteAllActivities() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/activities');
        }

        function deleteActivitiesBySchool() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/activities/school/' + $rootScope.schoolID);
        }

        function deleteActivitiesByClassroom() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/activities/classroom/' + $rootScope.classroomID);
        }

        function deleteActivitiesByTeacher() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/activities/teacher/' + $rootScope.teacherID + '/' + $rootScope.yearID);
        }

        function deleteAllClassrooms() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/classrooms');
        }

        function deleteClassroomsBySchool() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/classrooms/school/' + $rootScope.schoolID);
        }

        function deleteClassroomByTeacher() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/classrooms/teacher/' + $rootScope.teacherID + '/' + $rootScope.yearID);
        }

        function deleteClassroomSubjects() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/classrooms/' + $rootScope.classroomID + '/subjects');
        }

        function deleteAllSchools() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/schools');
        }

        function deleteSchoolByUserId() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/schools/admin/' + $rootScope.userID);
        }

        function deleteAllStudents() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/students');
        }

        function deleteStudentsBySchool() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/students/school/' + $rootScope.schoolID);
        }

        function deleteStudentByUserId() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/students/admin/' + $rootScope.userID);
        }

        function deleteStudentGrades() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/students/' + $rootScope.studentID + '/grades/classroom/' + $rootScope.classroomID);
        }

        function deleteAllSubjects() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/subjects');
        }

        function deleteAllTeachers() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/teachers');
        }

        function deleteTeachersBySchool() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/teachers/school/' + $rootScope.schoolID);
        }

        function deleteTeacherByUserId() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/teachers/admin/' + $rootScope.userID);
        }

        function deleteAllTests() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/tests');
        }

        function deleteTestByClassroom() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(baseURL + '/api/tests/classroom/' + $rootScope.classroomID);
        }

        return {
            deleteAllActivities: deleteAllActivities,
            deleteActivitiesBySchool: deleteActivitiesBySchool,
            deleteActivitiesByClassroom: deleteActivitiesByClassroom,
            deleteActivitiesByTeacher: deleteActivitiesByTeacher,
            deleteAllClassrooms: deleteAllClassrooms,
            deleteClassroomsBySchool: deleteClassroomsBySchool,
            deleteClassroomByTeacher: deleteClassroomByTeacher,
            deleteClassroomSubjects: deleteClassroomSubjects,
            deleteAllSchools: deleteAllSchools,
            deleteSchoolByUserId: deleteSchoolByUserId,
            deleteAllStudents: deleteAllStudents,
            deleteStudentsBySchool: deleteStudentsBySchool,
            deleteStudentByUserId: deleteStudentByUserId,
            deleteStudentGrades: deleteStudentGrades,
            deleteAllSubjects: deleteAllSubjects,
            deleteAllTeachers: deleteAllTeachers,
            deleteTeachersBySchool: deleteTeachersBySchool,
            deleteTeacherByUserId: deleteTeacherByUserId,
            deleteAllTests: deleteAllTests,
            deleteTestByClassroom: deleteTestByClassroom
        };
    }

    angular.module('app')
        .factory('cacheService', ['$cacheFactory', '$rootScope', cacheService]);

}());