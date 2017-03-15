(function() {
    'use strict';

    function TestGradesController(testService, authentication, $stateParams) {

        var vm = this;
        vm.loading = false;
        vm.currentClassroom = authentication.getCurrentClassroom();
        vm.currentTeacher = authentication.getCurrentTeacher();

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        testService.getTestById($stateParams.id)
            .then(function(test) {
                vm.test = test;
            })
            .catch(showError);
    }

    angular.module('app')
        .controller('TestGradesController', ['testService', 'authentication', '$stateParams', TestGradesController]);

}());