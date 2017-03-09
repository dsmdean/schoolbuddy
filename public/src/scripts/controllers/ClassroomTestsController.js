(function() {
    'use strict';

    function ClassroomTestsController(testService, authentication) {

        var vm = this;
        vm.search = '';
        vm.currentPastSearch = '';
        vm.loading = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        testService.getAllTests()
            .then(function(tests) {
                vm.classroomTests = tests;
            })
            .catch(showError);

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'upcoming') {
                return Date.parse(item.date) > new Date();
            } else if (vm.currentPastSearch === 'past') {
                return Date.parse(item.date) < new Date();
            }
        };
    }

    angular.module('app')
        .controller('ClassroomTestsController', ['testService', 'authentication', ClassroomTestsController]);

}());