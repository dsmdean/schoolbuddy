(function() {
    'use strict';

    function HomeController(schoolService, classroomService, studentService, teacherService, activitiesService, subjectService, testService, authentication, notifier, $log, $state) {

        var vm = this;
        vm.loading = false;
        vm.isAdmin = authentication.isAdmin();
        vm.isSchoolAdmin = authentication.isSchoolAdmin();
        vm.isTeacher = authentication.isTeacher();
        vm.isStudent = authentication.isStudent();
        vm.currentSchool = authentication.getCurrentSchool();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.currentStudent = authentication.getCurrentStudent();
        vm.currentClassroom = authentication.getCurrentClassroom();

        if (vm.currentSchool != {}) {
            //
        }

        vm.message = 'School Buddy System!';

        function showError(message) {
            notifier.error(message);
        }

        if (vm.isAdmin) {
            schoolService.getAllSchools()
                .then(function(schools) {
                    vm.schoolCount = schools.length;
                })
                .catch(showError);

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

            activitiesService.getAllActivities()
                .then(function(activities) {
                    vm.activitiesCount = activities.length;
                })
                .catch(showError);

            subjectService.getAllSubjects()
                .then(function(subjects) {
                    vm.subjectsCount = subjects.length;
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

            activitiesService.getActivitiesBySchool(vm.currentSchool._id)
                .then(function(activities) {
                    vm.activitiesCount = activities.length;
                })
                .catch(showError);
        } else if (vm.isTeacher) {
            vm.studentsCount = vm.currentClassroom.students.length;
            vm.subjectsCount = vm.currentClassroom.subjects.length;

            activitiesService.getActivitiesByClassroom(vm.currentClassroom._id)
                .then(function(activities) {
                    vm.activitiesCount = activities.length;
                })
                .catch(showError);

            testService.getTestByClassroom(vm.currentClassroom._id)
                .then(function(tests) {
                    vm.testsCount = tests.length;
                })
                .catch(showError);
        } else if (vm.isStudent) {
            vm.gradesCount = vm.currentStudent.grades.length;

            activitiesService.getActivitiesByClassroom(vm.currentStudent.currentClassroom)
                .then(function(activities) {
                    vm.activitiesCount = activities.length;
                })
                .catch(showError);

            testService.getTestByClassroom(vm.currentStudent.currentClassroom)
                .then(function(tests) {
                    vm.testsCount = tests.length;
                })
                .catch(showError);
        }
    }

    angular.module('app')
        .controller('HomeController', ['schoolService', 'classroomService', 'studentService', 'teacherService', 'activitiesService', 'subjectService', 'testService', 'authentication', 'notifier', '$log', '$state', HomeController]);

}());