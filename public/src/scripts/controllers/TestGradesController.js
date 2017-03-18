(function() {
    'use strict';

    function TestGradesController(testService, authentication, $stateParams, $state, notifier) {

        var vm = this;
        vm.loading = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.grades = {};

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        for (var i = 0; i < vm.currentClassroom.students.length; i++) {
            vm.grades[vm.currentClassroom.students[i]._id] = { test: $stateParams.id, grade: '0.0', feedback: '' };

            for (var j = 0; j < vm.currentClassroom.students[i].grades.length; j++) {
                if (vm.currentClassroom.students[i].grades[j].test == $stateParams.id) {
                    vm.grades[vm.currentClassroom.students[i]._id] = vm.currentClassroom.students[i].grades[j];
                    break;
                }
            }
        }

        testService.getTestById($stateParams.id)
            .then(function(test) {
                vm.test = test;
            })
            .catch(showError);

        vm.saveGrades = function() {
            vm.loading = true;
            testService.gradeTest(vm.grades)
                .then(function(response) {
                    vm.currentClassroom.students = response;
                    authentication.setCurrentClassroom(vm.currentClassroom);
                    vm.test.graded = true;
                    testService.updateTest(vm.test)
                        .then(function(response) {
                            notifier.success('Test graded.');
                            vm.loading = false;
                            $state.reload();
                        })
                        .catch(showError);
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('TestGradesController', ['testService', 'authentication', '$stateParams', '$state', 'notifier', TestGradesController]);

}());