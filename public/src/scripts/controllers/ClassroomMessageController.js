(function() {
    'use strict';

    function ClassroomMessageController($stateParams) {

        var vm = this;

        vm.message = $stateParams.classroomMessage;

    }

    angular.module('app')
        .controller('ClassroomMessageController', ['$stateParams', ClassroomMessageController]);

}());