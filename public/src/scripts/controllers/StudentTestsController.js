(function() {
    'use strict';

    function StudentTestsController(testService, authentication, notifier) {

        var vm = this;
        vm.search = '';
        vm.currentPastSearch = '';
        vm.loading = false;
        vm.currentStudent = authentication.getCurrentStudent();
        vm.currentClassroom = authentication.getCurrentClassroom();

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        testService.getTestByClassroom(vm.currentClassroom._id)
            .then(function(tests) {
                vm.classroomTests = tests;
            })
            .catch(showError);

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                if (Date.parse(item.date) > new Date()) {
                    item.upcoming = true;
                }
                if (Date.parse(item.date) < new Date()) {
                    item.past = true;
                }

                return item;
            } else if (vm.currentPastSearch === 'upcoming') {
                return Date.parse(item.date) > new Date() && item.canceled == false;
            } else if (vm.currentPastSearch === 'past') {
                return Date.parse(item.date) < new Date() && item.canceled == false;
            } else if (vm.currentPastSearch === 'canceled') {
                return item.canceled == true;
            } else if (vm.currentPastSearch === 'graded') {
                return item.graded == true;
            } else if (vm.currentPastSearch === 'ungraded') {
                return Date.parse(item.date) < new Date() && item.graded == false;
            }
        };
    }

    angular.module('app')
        .controller('StudentTestsController', ['testService', 'authentication', 'notifier', StudentTestsController]);

}());