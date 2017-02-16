(function() {
    'use strict';

    function TeacherRegisterController(teacherService, notifier, $state, authentication) {

        var vm = this;
        var currentSchool = authentication.getCurrentSchool();
        vm.newTeacher = {
            school: currentSchool._id
        };

        function showError(message) {
            notifier.error(message);
        }

        vm.registerTeacher = function() {
            teacherService.registerTeacher(vm.newTeacher)
                .then(function(response) {
                    notifier.success(response);
                    $state.go('teachers');
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('TeacherRegisterController', ['teacherService', 'notifier', '$state', 'authentication', TeacherRegisterController]);

}());