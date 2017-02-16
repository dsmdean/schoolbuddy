(function() {
    'use strict';

    function SchoolRegisterController(schoolService, notifier, $state) {

        var vm = this;
        vm.newSchool = {};
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerSchool = function() {
            if (vm.newSchool.password !== vm.newSchool.confirmPassword) {
                notifier.error('Your password does not match the confirmed password!');
            } else {
                vm.loading = true;
                schoolService.registerSchool(vm.newSchool)
                    .then(function(response) {
                        $state.go('schools');
                        vm.loading = false;
                        notifier.success(response);
                    })
                    .catch(showError);
            }
        };
    }

    angular.module('app')
        .controller('SchoolRegisterController', ['schoolService', 'notifier', '$state', SchoolRegisterController]);

}());