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
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: 'templates/allSchools.html'
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
            // .state('classrooms', {
            //     url: '/classrooms',
            //     controller: 'AllClassroomsController',
            //     controllerAs: 'classrooms',
            //     templateUrl: 'templates/allClassrooms.html',
            //     onEnter: function($log) {
            //         $log.debug('Entering the classrooms state.');
            //     },
            //     onExit: function($log) {
            //         $log.debug('Exiting the classrooms state.');
            //     }
            // })
            // .state('activities', {
            //     url: '/activities',
            //     controller: 'AllActivitiesController',
            //     controllerAs: 'activities',
            //     templateUrl: 'templates/allActivities.html',
            //     resolve: {
            //         activities: function(dataService) {
            //             return dataService.getAllActivities();
            //         }
            //     },
            //     data: {
            //         name: 'My Activity',
            //         desc: 'Fun!'
            //     },
            //     foo: {
            //         myFoo: 'bar'
            //     }
            // })
            // .state('classroom_parent', {
            //     abstract: true,
            //     url: '/classrooms/:id',
            //     controller: 'ClassroomController',
            //     controllerAs: 'classroom',
            //     templateUrl: 'templates/classroom_parent.html',
            //     params: {
            //         classroomMessage: { value: 'Learning is fun!' }
            //     },
            //     resolve: {
            //         classroom: function($stateParams, dataService) {
            //             return dataService.getClassroom($stateParams.id);
            //         }
            //     }
            // })
            // .state('classroom_parent.classroom_summary', {
            //     url: '/summary',
            //     views: {
            //         'classInfo': {
            //             controller: 'ClassroomSummaryController',
            //             controllerAs: 'classroomSummary',
            //             templateUrl: 'templates/classroom.html'
            //         },
            //         'classMessage': {
            //             controller: 'ClassroomMessageController',
            //             controllerAs: 'classroomMessage',
            //             templateUrl: 'templates/classroom_message.html'
            //         }
            //     },
            // })
            // .state('classroom_parent.classroom_detail', {
            //     url: '/detail/{month}',
            //     views: {
            //         'classInfo': {
            //             templateUrl: 'templates/classroomDetail.html'
            //         }
            //     }
            // })
        ;

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