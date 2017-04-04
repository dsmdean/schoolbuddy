(function() {
    'use strict';

    function PrincipalRegisterController(schoolService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;
        vm.newPrincipal = {
            current: true
        };

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerPrincipal = function() {
            vm.loading = true;
            schoolService.registerPrincipal(vm.currentSchool._id, vm.newPrincipal)
                .then(function(response) {
                    vm.currentSchool.principals = response;
                    authentication.setCurrentSchool(vm.currentSchool);
                    notifier.success('Principal registered!');
                    vm.loading = false;
                    $state.go('principals');
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('PrincipalRegisterController', ['schoolService', 'authentication', 'notifier', '$state', PrincipalRegisterController]);

}());