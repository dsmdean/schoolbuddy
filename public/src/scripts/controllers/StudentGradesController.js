(function() {
    'use strict';

    function StudentGradesController(studentService, classroomService, authentication, notifier) {

        var vm = this;
        vm.loading = false;
        vm.filter = '';
        vm.currentStudent = authentication.getCurrentStudent();
        vm.currentClassroom = authentication.getCurrentClassroom();

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        studentService.getStudentGrades(vm.currentStudent._id, vm.currentClassroom._id)
            .then(function(grades) {
                vm.studentGrades = grades;

                classroomService.getClassroomSubjects(vm.currentClassroom._id)
                    .then(function(subjects) {
                        vm.classSubjects = subjects;

                        for (var i = 0; i < grades.length; i++) {
                            for (var j = 0; j < subjects.length; j++) {
                                if (grades[i].test.subject == subjects[j]._id) {
                                    grades[i].test.subject = subjects[j];
                                    break;
                                }
                            }
                        }
                    })
                    .catch(showError);
            })
            .catch(showError);

        vm.myFilter = function(item) {
            if (vm.filter === '') {
                return item;
            } else if (vm.filter != '') {
                return item.test.subject._id == vm.filter;
            }
        };

    }

    angular.module('app')
        .controller('StudentGradesController', ['studentService', 'classroomService', 'authentication', 'notifier', StudentGradesController]);

}());