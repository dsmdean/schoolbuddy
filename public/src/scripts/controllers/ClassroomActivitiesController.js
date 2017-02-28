(function() {
    'use strict';

    function ClassroomActivitiesController(activitiesService, schoolyearService, authentication, notifier, $state) {

        var vm = this;
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.currentYear = authentication.getCurrentYear();
        vm.classroom = authentication.getCurrentClassroom();
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        activitiesService.getActivitiesByClassroom(vm.classroom._id)
            .then(function(activities) {
                vm.classActivities = activities;
            })
            .catch(showError);

        // schoolyearService.getCurrentYear()
        //     .then(function(response) {
        //         vm.currentYear = response;

        //         activitiesService.getActivitiesByTeacher(vm.currentTeacher._id, vm.currentYear._id)
        //             .then(function(data) {
        //                 vm.classActivities = data.activities;
        //                 vm.classroom = data.classroom;
        //             })
        //             .catch(showError);
        //     })
        //     .catch(showError);

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
        .controller('ClassroomActivitiesController', ['activitiesService', 'schoolyearService', 'authentication', 'notifier', '$state', ClassroomActivitiesController]);

}());