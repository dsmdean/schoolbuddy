(function() {
    'use strict';

    function ClassroomTestsController(testService, authentication, notifier, $state) {

        var vm = this;
        vm.search = '';
        vm.currentPastSearch = '';
        vm.loading = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.testToReschedueleDelete = {};

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

        vm.setTestToReschedueleDelete = function(test) {
            vm.testToReschedueleDelete = test;
        };

        vm.reschedueleTest = function() {
            testService.updateTest(vm.testToReschedueleDelete)
                .then(function(response) {
                    notifier.success("Reschedueled test: " + response.title);
                })
                .catch(showError);
        };

        vm.deleteTest = function() {
            testService.deleteTest(vm.testToReschedueleDelete._id)
                .then(function(response) {
                    notifier.success('Deleted ' + response.title);
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.cancelTest = function() {
            vm.testToReschedueleDelete.canceled = true;
            testService.updateTest(vm.testToReschedueleDelete)
                .then(function(response) {
                    notifier.success('Canceled ' + response.title);
                })
                .cathc(showError);
        };
    }

    angular.module('app')
        .controller('ClassroomTestsController', ['testService', 'authentication', 'notifier', '$state', ClassroomTestsController]);

}());