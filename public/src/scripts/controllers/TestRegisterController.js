(function() {
    'use strict';

    function TestRegisterController(testService, authentication, classroomService, $state, notifier) {

        var vm = this;
        vm.loading = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.newTest = {
            classroom: vm.currentClassroom._id
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        classroomService.getClassroomSubjects(vm.currentClassroom._id)
            .then(function(subjects) {
                vm.subjects = subjects;
            })
            .catch(showError);

        vm.registerTest = function() {
            vm.loading = true;
            testService.registerTest(vm.newTest)
                .then(function(message) {
                    vm.loading = false;
                    notifier.success(message);
                    $state.go('classroom_tests');
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('TestRegisterController', ['testService', 'authentication', 'classroomService', '$state', 'notifier', TestRegisterController]);

}());