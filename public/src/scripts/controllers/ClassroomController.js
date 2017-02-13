(function() {
    'use strict';

    function ClassroomController(dataService, notifier, $stateParams, classroom, $state) {

        var vm = this;

        vm.month = $state.params.month;
        vm.message = $stateParams.classroomMessage;
        vm.currentClassroom = classroom;

        if ($state.params.month) {
            if (classroom.activities.length > 0) {
                vm.timePeriod = dataService.getMonthName($state.params.month);
            } else {
                vm.timePeriod = 'No activities this month';
            }
        } else {
            vm.timePeriod = 'All activities';
        }

    }

    angular.module('app')
        .controller('ClassroomController', ['dataService', 'notifier', '$stateParams', 'classroom', '$state', ClassroomController]);

}());