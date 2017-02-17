(function() {
    'use strict';

    function TeachersController(teacherService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.teacherDeleteSuspendData = {};
        vm.teacherStopped = {};
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
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

        vm.teacherToStop = function(teacher) {
            vm.teacherStopped = teacher;
        };

        vm.resetModalData = function() {
            vm.teacherDeleteSuspendData = {};
            vm.teacherStopped = {};
        };

        vm.deleteTeacher = function() {
            teacherService.deleteTeacher(vm.teacherDeleteSuspendData._id)
                .then(function(response) {
                    vm.teacherDeleteSuspendData = {};
                    notifier.success('Teacher named: ' + response.name + ' deleted.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.suspendTeacher = function() {
            teacherService.suspendTeacher(vm.teacherDeleteSuspendData._id)
                .then(function(response) {
                    vm.teacherDeleteSuspendData = {};
                    notifier.success('Teacher named: ' + response.name + ' suspended.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.stopWorking = function() {
            vm.teacherStopped.endDate = new Date();

            teacherService.updateTeacher(vm.teacherStopped)
                .then(function(response) {
                    vm.teacherStopped = {};
                    notifier.success('Teacher named: ' + response.teacher.firstname + ' ' + response.teacher.lastname + ' saved.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'current') {
                return item.endDate == undefined;
            } else if (vm.currentPastSearch === 'past') {
                return item.endDate != undefined;
            }
        };

    }

    angular.module('app')
        .controller('TeachersController', ['teacherService', 'authentication', 'notifier', '$state', TeachersController]);

}());