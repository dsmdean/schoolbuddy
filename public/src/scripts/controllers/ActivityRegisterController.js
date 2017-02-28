(function() {
    'use strict';

    function ActivityRegisterController(activitiesService, schoolyearService, authentication, notifier, $state) {

        var vm = this;
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.classroom = authentication.getCurrentClassroom();
        vm.loading = false;
        vm.newActivity = {
            classroom: vm.classroom._id,
            school: vm.currentTeacher.school
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerActivity = function() {
            vm.loading = true;
            activitiesService.registerActivity(vm.newActivity)
                .then(function(response) {
                    $state.go('classroom_activities');
                    notifier.success('Activity registered!');
                    vm.loading = false;
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('ActivityRegisterController', ['activitiesService', 'schoolyearService', 'authentication', 'notifier', '$state', ActivityRegisterController]);

}());