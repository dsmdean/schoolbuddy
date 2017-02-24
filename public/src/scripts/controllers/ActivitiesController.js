(function() {
    'use strict';

    function ActivitiesController(activitiesService, authentication, notifier, $state) {

        var vm = this;
        vm.currentSchool = authentication.getCurrentSchool();
        vm.activityOnHoldData = {};
        vm.currentPastSearch = '';
        vm.search = '';
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        activitiesService.getActivitiesBySchool(vm.currentSchool._id)
            .then(function(activities) {
                vm.activitiesBySchool = activities;
            })
            .catch(showError);

        vm.activityToPutOnHold = function(id, name, hold) {
            vm.activityOnHoldData._id = id;
            vm.activityOnHoldData.name = name;
            vm.activityOnHoldData.hold = hold;
        };

        vm.setActivityOnHold = function() {
            activitiesService.setActivityOnHold(vm.activityOnHoldData._id, vm.activityOnHoldData.hold)
                .then(function(response) {
                    notifier.success('Activity named: ' + response.name + ' on hold.');
                    $(".modal-backdrop").hide();
                    $state.reload();
                })
                .catch(showError);
        };

        vm.myFilter = function(item) {
            if (vm.currentPastSearch === '') {
                return item;
            } else if (vm.currentPastSearch === 'current') {
                return item.hold == false && Date.parse(item.date) > new Date();
            } else if (vm.currentPastSearch === 'past') {
                return item.hold == false && Date.parse(item.date) < new Date();
            } else if (vm.currentPastSearch === 'hold') {
                return item.hold == true && Date.parse(item.date) > new Date();
            }
        };

    }

    angular.module('app')
        .controller('ActivitiesController', ['activitiesService', 'authentication', 'notifier', '$state', ActivitiesController]);

}());