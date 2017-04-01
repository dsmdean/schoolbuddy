(function() {
    'use strict';

    function PrincipalController(schoolService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.principals = vm.currentSchool.principals;

        vm.myFilter = function(item) {
            return !item.current;
        };

        vm.currentFilter = function(item) {
            return item.current;
        };

    }

    angular.module('app')
        .controller('PrincipalController', ['schoolService', 'authentication', 'notifier', '$state', PrincipalController]);

}());