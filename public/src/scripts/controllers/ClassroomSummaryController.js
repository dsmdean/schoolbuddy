(function() {
    'use strict';

    function ClassroomSummaryController(classroom) {

        var vm = this;

        vm.schoolPrincipal = classroom.school.principal;

    }

    angular.module('app')
        .controller('ClassroomSummaryController', ['classroom', ClassroomSummaryController]);

}());