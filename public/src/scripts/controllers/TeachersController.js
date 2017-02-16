(function() {
    'use strict';

    function TeachersController(teacherService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.teacherDeleteSuspendData = {};
        vm.search = '';

        function showError(message) {
            notifier.error(message);
        }

        teacherService.getAllTeachers(vm.currentSchool._id)
            .then(function(teachers) {
                vm.allTeachers = teachers;
            })
            .catch(showError);

        vm.teacherToDeleteSuspend = function(id, name, action) {
            vm.teacherDeleteSuspendData._id = id;
            vm.teacherDeleteSuspendData.name = name;
            vm.teacherDeleteSuspendData.action = action;
        };

        vm.deleteTeacher = function() {
            teacherService.deleteTeacher(vm.teacherDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('Teacher named: ' + response.name + ' deleted.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.suspendTeacher = function() {
            teacherService.suspendTeacher(vm.teacherDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('Teacher named: ' + response.name + ' suspended.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('TeachersController', ['teacherService', 'authentication', 'notifier', '$state', TeachersController]);

}());