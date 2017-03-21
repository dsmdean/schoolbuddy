(function() {
    'use strict';

    function StudentActivitiesController(activitiesService, authentication, notifier) {

        var vm = this;
        vm.currentStudent = authentication.getCurrentStudent();
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        activitiesService.getActivitiesByClassroom(vm.currentClassroom._id)
            .then(function(activities) {
                vm.classActivities = activities;
            })
            .catch(showError);

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'current') {
                return item.hold == false && Date.parse(item.date) > new Date();
            } else if (vm.currentPastSearch === 'past') {
                return item.hold == false && Date.parse(item.date) < new Date();
            } else if (vm.currentPastSearch === 'hold') {
                return item.hold == true && Date.parse(item.date) > new Date();
            }
        };
    }

    angular.module('app')
        .controller('StudentActivitiesController', ['activitiesService', 'authentication', 'notifier', StudentActivitiesController]);

}());