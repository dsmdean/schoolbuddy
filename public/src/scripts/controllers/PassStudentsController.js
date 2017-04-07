(function() {
    'use strict';

    function PassStudentsController(studentService, authentication, notifier, $state) {

        var vm = this;
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.currentYear = authentication.getCurrentYear();
        vm.classroom = authentication.getCurrentClassroom();
        vm.students = vm.classroom.students;
        vm.search = '';
        vm.loading = false;
        vm.studentsToPass = [];
        vm.nextGrade = '';

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.passStudents = function() {
            for (var i = 0; i < vm.students.length; i++) {
                if (vm.students[i].pass) {
                    vm.studentsToPass.push(vm.students[i]._id);
                }
            }

            studentService.passStudents({ newGrade: vm.nextGrade, classroomID: vm.classroom._id, studentsToPass: vm.studentsToPass })
                .then(function(response) {
                    notifier.success('Students passed!');

                    authentication.setCurrentClassroom(response);
                    $state.go('teacher_classroom');
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('PassStudentsController', ['studentService', 'authentication', 'notifier', '$state', PassStudentsController]);

}());