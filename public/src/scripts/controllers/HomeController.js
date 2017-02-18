(function() {
    'use strict';

    function HomeController(schoolService, classroomService, studentService, teacherService, authentication, notifier, $log, $state) {

        var vm = this;
        vm.isAdmin = authentication.isAdmin();
        vm.isSchoolAdmin = authentication.isSchoolAdmin();
        vm.currentSchool = authentication.getCurrentSchool();

        vm.message = 'School Buddy System!';

        function showError(message) {
            notifier.error(message);
        }

        schoolService.getAllSchools()
            .then(function(schools) {
                vm.schoolCount = schools.length;
            })
            .catch(showError);

        if (vm.isAdmin) {
            classroomService.getAllClassrooms()
                .then(function(classrooms) {
                    vm.classroomCount = classrooms.length;
                })
                .catch(showError);

            studentService.getAllStudents()
                .then(function(students) {
                    vm.studentCount = students.length;
                })
                .catch(showError);

            teacherService.getAllTeachers()
                .then(function(teachers) {
                    vm.teacherCount = teachers.length;
                })
                .catch(showError);
        } else if (vm.isSchoolAdmin) {
            classroomService.getClassroomsBySchool(vm.currentSchool._id)
                .then(function(classrooms) {
                    vm.classroomCount = classrooms.length;
                })
                .catch(showError);

            studentService.getStudentsBySchool(vm.currentSchool._id)
                .then(function(students) {
                    vm.studentCount = students.length;
                })
                .catch(showError);

            teacherService.getTeachersBySchool(vm.currentSchool._id)
                .then(function(teachers) {
                    vm.teacherCount = teachers.length;
                })
                .catch(showError);
        }
    }

    angular.module('app')
        .controller('HomeController', ['schoolService', 'classroomService', 'studentService', 'teacherService', 'authentication', 'notifier', '$log', '$state', HomeController]);

}());