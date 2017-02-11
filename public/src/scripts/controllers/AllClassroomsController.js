(function() {
    'use strict';

    function AllClassroomsController(dataService, notifier) {

        var vm = this;

        function showError(message) {
            notifier.error(message);
        }

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
            })
            .catch(showError);

    }

    angular.module('app')
        .controller('AllClassroomsController', ['dataService', 'notifier', AllClassroomsController]);

}());