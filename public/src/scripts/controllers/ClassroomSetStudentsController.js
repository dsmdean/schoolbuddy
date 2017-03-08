(function() {
    'use strict';

    function ClassroomSetStudentsController(classroomService, studentService, authentication, schoolyearService, notifier, $state, $stateParams) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.classroomDeleteData = {};
        vm.currentPastSearch = '';
        vm.searchCurrent = '';
        vm.search = '';
        vm.loading = false;
        vm.addedStudents = [];
        vm.classStudents = [];
        vm.studentsToDelete = [];

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        classroomService.getClassroomByID($stateParams.classroom)
            .then(function(classroom) {
                vm.currentClass = classroom;
                vm.classStudents = classroom.students;

                studentService.getStudentsBySchoolGradeNotInClass(vm.currentSchool._id, vm.currentClass.grade)
                    .then(function(students) {
                        vm.students = students;
                    })
                    .catch(showError);
            })
            .catch(showError);

        vm.addStudentToClass = function(student) {
            if (vm.classStudents.indexOf(student) == -1) {
                student.new = true;
                vm.classStudents.push(student);
                vm.addedStudents.push(student._id);
                vm.students[vm.students.indexOf(student)].new = true;
            }
        };

        vm.removeStudentFromClass = function(student) {
            if (vm.classStudents.indexOf(student) != -1) {
                vm.classStudents.splice(vm.classStudents.indexOf(student), 1);
                vm.addedStudents.splice(vm.addedStudents.indexOf(student._id), 1);

                if (vm.students.indexOf(student) != -1) {
                    vm.students[vm.students.indexOf(student)].new = false;
                } else {
                    student.new = true;
                    vm.studentsToDelete.push(student);
                }

            }
        };

        vm.saveStudentsToClass = function() {
            if (vm.addedStudents.length > 0) {
                classroomService.addStudentsToClassroom($stateParams.classroom, { students: vm.addedStudents })
                    .then(function(response) {
                        notifier.success("Students saved to class: " + response.grade);
                        $state.reload();
                    })
                    .catch(showError);
            }

            if (vm.studentsToDelete.length > 0) {
                // console.log("Delete Students");
                classroomService.deleteStudentsFromClassroom($stateParams.classroom, { students: vm.studentsToDelete })
                    .then(function(response) {
                        notifier.success("Students deleted from class: " + response.grade);
                        $state.reload();
                    })
                    .catch(showError);
            }

        };
    }

    angular.module('app')
        .controller('ClassroomSetStudentsController', ['classroomService', 'studentService', 'authentication', 'schoolyearService', 'notifier', '$state', '$stateParams', ClassroomSetStudentsController]);

}());