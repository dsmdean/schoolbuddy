(function() {
    'use strict';

    function LoginController(authentication, notifier, $state) {

        var vm = this;
        vm.loading = false;

        vm.userData = {};

        function showError(message) {
            vm.loading = false;

            if (message.message != undefined) {
                notifier.error(message.message);
            } else {
                notifier.error(message);
            }
        }

        vm.login = function() {
            vm.loading = true;
            authentication.login(vm.userData)
                .then(function(response) {
                    $state.go('profile');
                    vm.loading = false;
                    notifier.success('Logged in successful!');
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('LoginController', ['authentication', 'notifier', '$state', LoginController]);

}());