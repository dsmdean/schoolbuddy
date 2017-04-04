(function() {
    'use strict';

    function SchoolyearsController(schoolyearService, notifier, $state) {

        var vm = this;
        vm.loading = false;
        vm.yearToMakeCurrent = {};

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        schoolyearService.getAllYears()
            .then(function(response) {
                vm.schoolyears = response;
            })
            .catch(showError);

        vm.makeYearCurrent = function(schoolyear) {
            vm.yearToMakeCurrent = schoolyear;
        };

        vm.setCurrentYear = function() {
            vm.loading = true;
            vm.yearToMakeCurrent.current = true;
            schoolyearService.setCurrentYear(vm.yearToMakeCurrent)
                .then(function(response) {
                    vm.loading = false;
                    notifier.success(vm.yearToMakeCurrent.year + ' set as current year!');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            return !item.current;
        };

        vm.currentFilter = function(item) {
            return item.current;
        };

    }

    angular.module('app')
        .controller('SchoolyearsController', ['schoolyearService', 'notifier', '$state', SchoolyearsController]);

}());