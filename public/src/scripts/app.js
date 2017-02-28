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
                url: '/teacher-classroom',
                controller: 'TeacherClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/teacherClassroom.html'
            })
            .state('classroom_activities', {
                url: '/classroom-activities',
                controller: 'ClassroomActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/classroomActivities.html'
            })
            .state('activity_register', {
                url: '/activity/register',
                controller: 'ActivityRegisterController',
                controllerAs: 'activity',
                templateUrl: 'templates/newActivity.html'
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
                $state.go('profile');
            }

            if (!authentication.isAdmin() && (toState.name == 'schools' || toState.name == 'schools_register')) {
                event.preventDefault();
                $state.go('profile');
            }

            if (!authentication.isSchoolAdmin() && (toState.name == 'teachers' || toState.name == 'teachers_register' || toState.name == 'students' || toState.name == 'students_register' || toState.name == 'classrooms' || toState.name == 'classrooms_register' || toState.name == 'classrooms_set_students' || toState.name == 'activities')) {
                event.preventDefault();
                $state.go('profile');
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