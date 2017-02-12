(function() {
    'use strict';

    function ClassroomController(dataService, notifier, $stateParams) {

        var vm = this;

        vm.month = $stateParams.month;
        vm.message = $stateParams.classroomMessage;

        function showError(message) {
            notifier.error(message);
        }

        dataService.getClassroom($stateParams.id)
            .then(function(classroom) {
                vm.currentClassroom = classroom;

                if ($stateParams.month) {
                    if (classroom.activities.length > 0) {
                        vm.timePeriod = dataService.getMonthName($stateParams.month);
                    } else {
                        vm.timePeriod = 'No activities this month';
                    }
                } else {
                    vm.timePeriod = 'All activities';
                }
            })
            .catch(showError);

    }

    angular.module('app')
        .controller('ClassroomController', ['dataService', 'notifier', '$stateParams', ClassroomController]);

}());