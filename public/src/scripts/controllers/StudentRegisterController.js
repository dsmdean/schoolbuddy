(function() {
    'use strict';

    function StudentRegisterController(studentService, notifier, $state, authentication) {

        var vm = this;
        vm.loading = false;
        var currentSchool = authentication.getCurrentSchool();
        vm.newStudent = {
            school: currentSchool._id
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerStudent = function() {
            if (vm.newStudent.password !== vm.newStudent.confirmPassword) {
                notifier.error('Your password does not match the confirmed password!');
            } else {
                vm.loading = true;
                studentService.registerStudent(vm.newStudent)
                    .then(function(response) {
                        notifier.success(response);
                        $state.go('students');
                        vm.loading = false;
                    })
                    .catch(showError);
            }
        };
    }

    angular.module('app')
        .controller('StudentRegisterController', ['studentService', 'notifier', '$state', 'authentication', StudentRegisterController]);

}());