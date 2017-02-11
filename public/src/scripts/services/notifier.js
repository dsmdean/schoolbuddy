(function() {
    'use strict';

    function notifier() {

        toastr.options = {
            "showDuration": "300",
            "timeOut": "2000"
        };

        function success(message) {
            toastr.success(message);
        }

        function error(message) {
            toastr.error(message);
        }

        return {
            success: success,
            error: error
        };
    }

    angular.module('app')
        .factory('notifier', notifier);

}());