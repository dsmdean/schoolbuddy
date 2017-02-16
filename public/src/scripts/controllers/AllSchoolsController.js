(function() {
    'use strict';

    function AllSchoolsController(schoolService, notifier, $state) {

        var vm = this;
        vm.schoolDeleteSuspendData = {};
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        schoolService.getAllSchools()
            .then(function(schools) {
                vm.allSchools = schools;
            })
            .catch(showError);

        vm.schoolToDeleteSuspend = function(id, name, action) {
            vm.schoolDeleteSuspendData._id = id;
            vm.schoolDeleteSuspendData.name = name;
            vm.schoolDeleteSuspendData.action = action;
        };

        vm.deleteSchool = function() {
            schoolService.deleteSchool(vm.schoolDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('School named: ' + response.name + ' deleted.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.suspendSchool = function() {
            schoolService.suspendSchool(vm.schoolDeleteSuspendData._id)
                .then(function(response) {
                    notifier.success('School named: ' + response.name + ' suspended.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('AllSchoolsController', ['schoolService', 'notifier', '$state', AllSchoolsController]);

}());