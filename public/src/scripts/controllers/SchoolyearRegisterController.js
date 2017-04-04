(function() {
    'use strict';

    function SchoolyearRegisterController(schoolyearService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.loading = false;
        vm.newSchoolyear = {};

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        schoolyearService.getAllYears()
            .then(function(response) {
                vm.schoolyears = response;
            })
            .catch(showError);

        vm.registerSchoolyear = function() {
            vm.loading = true;
            schoolyearService.registerSchoolyear(vm.newSchoolyear)
                .then(function(response) {
                    vm.loading = false;
                    notifier.success('Schoolyear registered!');
                    $state.go('schoolyears');
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('SchoolyearRegisterController', ['schoolyearService', 'authentication', 'notifier', '$state', SchoolyearRegisterController]);

}());