(function() {
    'use strict';

    function SchoolRegisterController(schoolService, notifier, $state) {

        var vm = this;
        vm.newSchool = {};

        function showError(message) {
            notifier.error(message);
        }

        vm.registerSchool = function() {
            schoolService.registerSchool(vm.newSchool)
                .then(function(response) {
                    notifier.success(response);
                    $state.go('schools');
                })
                .catch(showError);
        };
    }

    angular.module('app')
        .controller('SchoolRegisterController', ['schoolService', 'notifier', '$state', SchoolRegisterController]);

}());