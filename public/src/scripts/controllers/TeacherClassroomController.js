(function() {
    'use strict';

    function TeacherClassroomController(authentication, notifier) {

        var vm = this;
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.currentYear = authentication.getCurrentYear();
        vm.classroom = authentication.getCurrentClassroom();
        vm.students = vm.classroom.students;
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }
    }

    angular.module('app')
        .controller('TeacherClassroomController', ['authentication', 'notifier', TeacherClassroomController]);

}());