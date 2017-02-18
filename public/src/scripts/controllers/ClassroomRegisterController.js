(function() {
    'use strict';

    function ClassroomRegisterController(classroomService, teacherService, notifier, $state, authentication) {

        var vm = this;
        vm.loading = false;
        var currentSchool = authentication.getCurrentSchool();
        vm.newClassroom = {
            school: currentSchool._id
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        teacherService.getAllTeachers(currentSchool._id)
            .then(function(teachers) {
                vm.allTeachers = teachers;
            })
            .catch(showError);

        vm.registerClassroom = function() {
            vm.loading = true;

            var teacherID = vm.newClassroom.teacher.split(": ")[0];
            var teacherName = vm.newClassroom.teacher.split(": ")[1];
            vm.newClassroom.teacher = teacherID;
            vm.newClassroom.teacherName = teacherName;

            classroomService.registerClassroom(vm.newClassroom)
                .then(function(response) {
                    notifier.success(response);
                    $state.go('classrooms');
                    vm.loading = false;
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            return item.endDate == undefined;
        };
    }

    angular.module('app')
        .controller('ClassroomRegisterController', ['classroomService', 'teacherService', 'notifier', '$state', 'authentication', ClassroomRegisterController]);

}());