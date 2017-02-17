(function() {
    'use strict';

    function StudentsController(studentService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.studentDeleteSuspendData = {};
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        studentService.getAllStudents(vm.currentSchool._id)
            .then(function(students) {
                vm.allStudents = students;
            })
            .catch(showError);

        vm.studentToDeleteSuspend = function(id, name, action) {
            vm.studentDeleteSuspendData._id = id;
            vm.studentDeleteSuspendData.name = name;
            vm.studentDeleteSuspendData.action = action;
        };

        vm.deleteStudent = function() {
            studentService.deleteStudent(vm.studentDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('Student named: ' + response.name + ' deleted.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.suspendStudent = function() {
            studentService.suspendStudent(vm.studentDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('Student named: ' + response.name + ' suspended.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'current') {
                return item.graduated == false;
            } else if (vm.currentPastSearch === 'graduated') {
                return item.graduated == true;
            }
        };

    }

    angular.module('app')
        .controller('StudentsController', ['studentService', 'authentication', 'notifier', '$state', StudentsController]);

}());