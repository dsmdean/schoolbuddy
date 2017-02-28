(function() {
    'use strict';

    function SubjectsController(subjectService, authentication, notifier, $state) {

        var vm = this;
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        subjectService.getAllSubjects()
            .then(function(subjects) {
                vm.allSubjects = subjects;
            })
            .catch(showError);

    }

    angular.module('app')
        .controller('SubjectsController', ['subjectService', 'authentication', 'notifier', '$state', SubjectsController]);

}());