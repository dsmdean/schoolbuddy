(function() {
    'use strict';

    function SubjectRegisterController(subjectService, authentication, notifier, $state) {

        var vm = this;
        vm.search = '';
        vm.loading = false;
        vm.newSubject = {};

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.registerSubject = function() {
            vm.loading = true;
            subjectService.registerSubject(vm.newSubject)
                .then(function(message) {
                    notifier.success(message);
                    $state.go('subjects');
                    vm.loading = false;
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('SubjectRegisterController', ['subjectService', 'authentication', 'notifier', '$state', SubjectRegisterController]);

}());