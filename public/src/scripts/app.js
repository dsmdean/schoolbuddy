(function() {
    'use strict';

    var app = angular.module('app', ['ui.router']);

    app.config(['$logProvider', '$stateProvider', '$urlRouterProvider', function($logProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        // $locationProvider.hashPrefix('!');

        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'login',
                templateUrl: 'templates/login.html'
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileController',
                controllerAs: 'profile',
                templateUrl: 'templates/profile.html'
            })
            .state('home', {
                url: '/',
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: 'templates/home.html'
            })
            .state('schools', {
                url: '/schools',
                controller: 'SchoolsController',
                controllerAs: 'schools',
                templateUrl: 'templates/schools.html'
            })
            .state('schools_register', {
                url: '/schools/register',
                controller: 'SchoolRegisterController',
                controllerAs: 'school',
                templateUrl: 'templates/newSchool.html'
            })
            .state('teachers', {
                url: '/teachers',
                controller: 'TeachersController',
                controllerAs: 'teachers',
                templateUrl: 'templates/teachers.html'
            })
            .state('teachers_register', {
                url: '/teachers/register',
                controller: 'TeacherRegisterController',
                controllerAs: 'teacher',
                templateUrl: 'templates/newTeacher.html'
            })
            .state('students', {
                url: '/students',
                controller: 'StudentsController',
                controllerAs: 'students',
                templateUrl: 'templates/students.html'
            })
            .state('students_register', {
                url: '/students/register',
                controller: 'StudentRegisterController',
                controllerAs: 'student',
                templateUrl: 'templates/newStudent.html'
            })
            .state('classrooms', {
                url: '/classrooms',
                controller: 'ClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: 'templates/classrooms.html'
            })
            .state('classrooms_register', {
                url: '/classrooms/register',
                controller: 'ClassroomRegisterController',
                controllerAs: 'classroom',
                templateUrl: 'templates/newClassroom.html'
            })
            .state('classrooms_set_students', {
                url: '/classrooms/:classroom/students',
                controller: 'ClassroomSetStudentsController',
                controllerAs: 'classroom',
                templateUrl: 'templates/classroomStudents.html'
            })
            .state('activities', {
                url: '/activities',
                controller: 'ActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/activities.html'
            })
            .state('teacher_classroom', {
                url: '/teacher/classroom',
                controller: 'TeacherClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/teacherClassroom.html'
            })
            .state('classroom_activities', {
                url: '/classroom/activities',
                controller: 'ClassroomActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/classroomActivities.html'
            })
            .state('activity_register', {
                url: '/classroom/activities/register',
                controller: 'ActivityRegisterController',
                controllerAs: 'activity',
                templateUrl: 'templates/newActivity.html'
            })
            .state('subjects', {
                url: '/subjects',
                controller: 'SubjectsController',
                controllerAs: 'subjects',
                templateUrl: 'templates/subjects.html'
            })
            .state('subject_register', {
                url: '/subjects/register',
                controller: 'SubjectRegisterController',
                controllerAs: 'subject',
                templateUrl: 'templates/newSubject.html'
            })
            .state('classroom_subjects', {
                url: '/classroom/subjects',
                controller: 'ClassroomSubjectsController',
                controllerAs: 'subjects',
                templateUrl: 'templates/classroomSubjects.html'
            })
            .state('classroom_tests', {
                url: '/classroom/tests',
                controller: 'ClassroomTestsController',
                controllerAs: 'tests',
                templateUrl: 'templates/classroomTests.html'
            })
            .state('test_register', {
                url: '/classroom/tests/register',
                controller: 'TestRegisterController',
                controllerAs: 'test',
                templateUrl: 'templates/newTest.html'
            })
            .state('test_grade', {
                url: '/classroom/tests/:id/grade',
                controller: 'TestGradesController',
                controllerAs: 'test',
                templateUrl: 'templates/testGrade.html'
            })
            .state('student_activities', {
                url: '/student/activities',
                controller: 'StudentActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/studentActivities.html'
            })
            .state('student_tests', {
                url: '/student/tests',
                controller: 'StudentTestsController',
                controllerAs: 'tests',
                templateUrl: 'templates/studentTests.html'
            })
            .state('student_grades', {
                url: '/student/grades',
                controller: 'StudentGradesController',
                controllerAs: 'grades',
                templateUrl: 'templates/studentGrades.html'
            })
            .state('principals', {
                url: '/principals',
                controller: 'PrincipalController',
                controllerAs: 'principals',
                templateUrl: 'templates/principals.html'
            })
            .state('principal_register', {
                url: '/principals/register',
                controller: 'PrincipalRegisterController',
                controllerAs: 'principal',
                templateUrl: 'templates/newPrincipal.html'
            })
            .state('schoolyears', {
                url: '/schoolyears',
                controller: 'SchoolyearsController',
                controllerAs: 'schoolyears',
                templateUrl: 'templates/schoolyears.html'
            })
            .state('schoolyear_register', {
                url: '/schoolyears/register',
                controller: 'SchoolyearRegisterController',
                controllerAs: 'schoolyear',
                templateUrl: 'templates/newSchoolyear.html'
            })
            .state('pass_students', {
                url: '/teacher/classroom/pass',
                controller: 'PassStudentsController',
                controllerAs: 'students',
                templateUrl: 'templates/passStudents.html'
            });

    }]);

    app.run(['$rootScope', '$log', '$state', 'authentication', function($rootScope, $log, $state, authentication) {

        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        //     $log.debug('successfully changed route');

        //     $log.debug('event', event);
        //     $log.debug('toState', toState);
        //     $log.debug('toParams', toParams);
        //     $log.debug('fromState', fromState);
        //     $log.debug('fromParams', fromParams);

        // });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // $log.debug('State changed - Auth: ' + authentication.isAuthenticated());

            if (!authentication.isAuthenticated() && toState.name != 'login') {
                event.preventDefault();
                $state.go('login');
            } else if (authentication.isAuthenticated() && toState.name == 'login') {
                $state.go('home');
            }

            if (!authentication.isAdmin() && (toState.name == 'schools' || toState.name == 'schools_register' || toState.name == 'subjects' || toState.name == 'subject_register' || toState.name == 'schoolyears' || toState.name == 'schoolyear_register')) {
                event.preventDefault();
                $state.go('home');
            }

            if (!authentication.isSchoolAdmin() && (toState.name == 'teachers' || toState.name == 'teachers_register' || toState.name == 'students' || toState.name == 'students_register' || toState.name == 'classrooms' || toState.name == 'classrooms_register' || toState.name == 'classrooms_set_students' || toState.name == 'activities' || toState.name == 'principals' || toState.name == 'principal_register')) {
                event.preventDefault();
                $state.go('home');
            }

            if (!authentication.isTeacher() && (toState.name == 'teacher_classroom' || toState.name == 'classroom_subjects' || toState.name == 'classroom_activities' || toState.name == 'activity_register' || toState.name == 'classroom_tests' || toState.name == 'test_register' || toState.name == 'test_grade' || toState.name == 'pass_students')) {
                event.preventDefault();
                $state.go('home');
            }

            if (!authentication.isStudent() && (toState.name == 'student_activities' || toState.name == 'student_tests' || toState.name == 'student_grades')) {
                event.preventDefault();
                $state.go('home');
            }

        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {

            $log.error('The requested state was not found: ', unfoundState);

        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

            $log.error('An error occured while changing states: ', error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);

        });
    }]);

}());