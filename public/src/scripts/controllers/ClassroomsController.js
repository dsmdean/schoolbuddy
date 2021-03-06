(function() {
    'use strict';

    function ClassroomsController(classroomService, authentication, schoolyearService, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.classroomDeleteData = {};
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        schoolyearService.getCurrentYear()
            .then(function(response) {
                vm.currentYear = response._id;
            })
            .catch(showError);

        classroomService.getClassroomsBySchool(vm.currentSchool._id)
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
            })
            .catch(showError);

        vm.classroomToDelete = function(id, name, action) {
            vm.classroomDeleteData._id = id;
            vm.classroomDeleteData.name = name;
            vm.classroomDeleteData.action = action;
        };

        vm.deleteClassroom = function() {
            classroomService.deleteClassroom(vm.classroomDeleteData._id)
                .then(function(response) {
                    notifier.success('Classroom named: ' + response.name + ' deleted.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'current') {
                return item.schoolYear._id == vm.currentYear;
            } else if (vm.currentPastSearch === 'past') {
                return item.schoolYear._id != vm.currentYear;
            }
        };

    }

    angular.module('app')
        .controller('ClassroomsController', ['classroomService', 'authentication', 'schoolyearService', 'notifier', '$state', ClassroomsController]);

}());