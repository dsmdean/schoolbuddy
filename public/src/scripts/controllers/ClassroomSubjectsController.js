(function() {
    'use strict';

    function ClassroomSubjectsController(classroomService, subjectService, authentication, notifier, $state) {

        var vm = this;
        vm.search = '';
        vm.loading = false;
        vm.addSubject = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.newClassSubjects = [];
        vm.subjectsToDelete = [];

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.addSubjectToClass = function(subject) {
            if (vm.classSubjects.indexOf(subject) == -1) {
                subject.new = true;
                vm.classSubjects.push(subject);
                vm.newClassSubjects.push(subject._id);
                vm.filteredSubjects[vm.filteredSubjects.indexOf(subject)].new = true;
            }
        };

        vm.removeSubjectFromClass = function(subject) {
            if (vm.classSubjects.indexOf(subject) != -1) {
                vm.classSubjects.splice(vm.classSubjects.indexOf(subject), 1);
                vm.newClassSubjects.splice(vm.newClassSubjects.indexOf(subject._id), 1);

                if (vm.filteredSubjects.indexOf(subject) != -1) {
                    vm.filteredSubjects[vm.filteredSubjects.indexOf(subject)].new = false;
                } else {
                    subject.new = true;
                    vm.subjectsToDelete.push(subject);
                }

            }
        };

        vm.toggleAddSubject = function() {
            vm.addSubject = !vm.addSubject;
        };

        vm.saveSubjectsToClass = function() {
            if (vm.newClassSubjects.length > 0) {
                subjectService.addSubjectsToClassroom(vm.currentClassroom._id, { subjects: vm.newClassSubjects })
                    .then(function(response) {
                        notifier.success("Subjects saved to class: " + response.grade);
                        $state.reload();
                    })
                    .catch(showError);
            }

            if (vm.subjectsToDelete.length > 0) {
                subjectService.deleteSubjectsFromClassroom(vm.currentClassroom._id, { subjects: vm.subjectsToDelete })
                    .then(function(response) {
                        notifier.success("Subjects deleted from class: " + response.grade);
                        $state.reload();
                    })
                    .catch(showError);
            }

        };

        classroomService.getClassroomSubjects(vm.currentClassroom._id)
            .then(function(subjects) {
                vm.classSubjects = subjects;

                subjectService.getAllSubjects()
                    .then(function(subjects) {
                        vm.allSubjects = subjects;

                        vm.filteredSubjects = vm.allSubjects.filter(function(subject) {

                            for (var i = 0; i < vm.classSubjects.length; i++) {
                                if (vm.classSubjects[i].subject == subject.subject) {
                                    return false;
                                }
                            }
                            return true;
                        });
                    })
                    .catch(showError);
            })
            .catch(showError);
    }

    angular.module('app')
        .controller('ClassroomSubjectsController', ['classroomService', 'subjectService', 'authentication', 'notifier', '$state', ClassroomSubjectsController]);

}());