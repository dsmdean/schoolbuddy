(function() {
    'use strict';

    function TeacherClassroomController(classroomService, schoolyearService, authentication, notifier, $state) {

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

        // schoolyearService.getCurrentYear()
        //     .then(function(response) {
        //         vm.currentYear = response;

        //         classroomService.getClassroomByTeacher(vm.currentTeacher._id, vm.currentYear._id)
        //             .then(function(classroom) {
        //                 vm.classroom = classroom;
        //                 vm.students = classroom.students;
        //             })
        //             .catch(showError);
        //     })
        //     .catch(showError);
    }

    angular.module('app')
        .controller('TeacherClassroomController', ['classroomService', 'schoolyearService', 'authentication', 'notifier', '$state', TeacherClassroomController]);

}());