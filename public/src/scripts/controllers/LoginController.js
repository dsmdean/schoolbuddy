(function() {
    'use strict';

    function LoginController(authentication, notifier, $state) {

        var vm = this;

        vm.userData = {};

        function showError(message) {
            notifier.error(message);
        }

        vm.login = function() {
            authentication.login(vm.userData)
                .then(function(response) {
                    notifier.success('Logged in successful!');
                    $state.go('home');
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('LoginController', ['authentication', 'notifier', '$state', LoginController]);

}());