(function() {
    'use strict';

    function HomeController(schoolService, notifier, $log, $state) {

        var vm = this;

        vm.message = 'School Buddy System!';

        function showError(message) {
            notifier.error(message);
        }

        schoolService.getAllSchools()
            .then(function(schools) {
                vm.allSchools = schools;
                vm.schoolCount = schools.length;
            })
            .catch(showError);

        // dataService.getAllClassrooms()
        //     .then(function(classrooms) {
        //         vm.allClassrooms = classrooms;
        //         vm.classroomCount = classrooms.length;
        //     })
        //     .catch(showError);

        // dataService.getAllActivities()
        //     .then(function(activities) {
        //         vm.allActivities = activities;
        //         vm.activityCount = activities.length;
        //     })
        //     .catch(showError);

    }

    angular.module('app')
        .controller('HomeController', ['schoolService', 'notifier', '$log', '$state', HomeController]);

}());