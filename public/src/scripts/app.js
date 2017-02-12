(function() {
    'use strict';

    var app = angular.module('app', ['ui.router']);

    app.config(['$logProvider', '$stateProvider', '$urlRouterProvider', function($logProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        // $locationProvider.hashPrefix('!');

        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
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
            .state('classrooms', {
                url: '/classrooms',
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: 'templates/allClassrooms.html',
                onEnter: function($log) {
                    $log.debug('Entering the classrooms state.');
                },
                onExit: function($log) {
                    $log.debug('Exiting the classrooms state.');
                }
            })
            .state('activities', {
                url: '/activities',
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/allActivities.html',
                resolve: {
                    activities: function(dataService) {
                        return dataService.getAllActivities();
                    }
                },
                data: {
                    name: 'My Activity',
                    desc: 'Fun!'
                },
                foo: {
                    myFoo: 'bar'
                }
            })
            .state('classrooms_summary', {
                url: '/classrooms/:id',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/classroom.html'
            })
            .state('classrooms_detail', {
                url: '/classrooms/{id}/detail/{month}',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/classroomDetail.html',
                params: {
                    classroomMessage: { value: 'Learning is fun!' }
                }
            });

    }]);

    app.run(['$rootScope', '$log', function($rootScope, $log) {

        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        //     $log.debug('successfully changed route');

        //     $log.debug('event', event);
        //     $log.debug('toState', toState);
        //     $log.debug('toParams', toParams);
        //     $log.debug('fromState', fromState);
        //     $log.debug('fromParams', fromParams);

        // });

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