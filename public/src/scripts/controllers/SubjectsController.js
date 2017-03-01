(function() {
    'use strict';

    function SubjectsController(subjectService, authentication, notifier, $state) {

        var vm = this;
        vm.search = '';
        vm.loading = false;
        vm.subjectDelete = {};

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.subjectToDelete = function(id, subject) {
            vm.subjectDelete.id = id;
            vm.subjectDelete.subject = subject;
        };

        vm.deleteSubject = function() {
            subjectService.deleteSubject(vm.subjectDelete.id)
                .then(function(response) {
                    notifier.success('Subject deleted! ' + response.subject);
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        subjectService.getAllSubjects()
            .then(function(subjects) {
                vm.allSubjects = subjects;
            })
            .catch(showError);

    }

    angular.module('app')
        .controller('SubjectsController', ['subjectService', 'authentication', 'notifier', '$state', SubjectsController]);

}());