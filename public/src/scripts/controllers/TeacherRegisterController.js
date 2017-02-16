(function() {
    'use strict';

    function TeacherRegisterController(teacherService, notifier, $state, authentication) {

        var vm = this;
        vm.loading = false;
        var currentSchool = authentication.getCurrentSchool();
        vm.newTeacher = {
            school: currentSchool._id
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerTeacher = function() {
            if (vm.newTeacher.password !== vm.newTeacher.confirmPassword) {
                notifier.error('Your password does not match the confirmed password!');
            } else {
                vm.loading = true;
                teacherService.registerTeacher(vm.newTeacher)
                    .then(function(response) {
                        notifier.success(response);
                        $state.go('teachers');
                        vm.loading = false;
                    })
                    .catch(showError);
            }
        };
    }

    angular.module('app')
        .controller('TeacherRegisterController', ['teacherService', 'notifier', '$state', 'authentication', TeacherRegisterController]);

}());