(function() {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider', function($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        // $locationProvider.hashPrefix('!');

        // $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: 'templates/home.html'
            })
            .when('/schools', {
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: 'templates/allSchools.html'
            })
            .when('/classrooms', {
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: 'templates/allClassrooms.html'
            })
            .when('/activities', {
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: 'templates/allActivities.html',
                resolve: {
                    activities: function(dataService) {
                        return dataService.getAllActivities();
                    }
                }
            })
            .when('/classrooms/:id', {
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/classroom.html'
            })
            .when('/classrooms/:id/detail/:month?', {
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: 'templates/classroomDetail.html'
            })
            .otherwise('/');

    }]);

    app.run(['$rootScope', '$log', function($rootScope, $log) {

        $rootScope.$on('$routeChangeSuccess', function(event, current, previous, rejection) {

            $log.debug('successfully changed route');

            // $log.debug(event);
            // $log.debug(current);
            // $log.debug(previous);
            // $log.debug(rejection);

        });
    }]);

}());