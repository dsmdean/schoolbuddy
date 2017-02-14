(function() {
    'use strict';

    function HeaderController(authentication, notifier, $state, $rootScope, localStorage, $window, $interval, $log) {

        var vm = this;
        var tokenExpiration;
        var interval;
        vm.loggedIn = false;
        vm.isAdmin = false;
        vm.currentUser = {};

        function stopInterval() {
            $interval.cancel(interval);
        }

        function loginSuccess() {
            vm.loggedIn = true;
            vm.currentUser = authentication.getCurrentUser();

            if (authentication.isAdmin()) {
                vm.isAdmin = true;
            }

            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h * 60 * 60 * 1000));
                return this;
            };

            tokenExpiration = localStorage.getObject('tokenExpiration', '{}');
            if (tokenExpiration.date === undefined) {
                tokenExpiration = { date: new Date().addHours(23.75) };
                localStorage.storeObject('tokenExpiration', tokenExpiration);
            }

            $log.debug('Token expiration: ' + Date.parse(tokenExpiration.date));

            interval = $interval(function() {
                if (new Date() >= Date.parse(tokenExpiration.date)) {
                    $log.debug('Time is up');
                    vm.logOut();

                    notifier.error("Your token has ended. You have been logged out!");
                } else {
                    // $log.debug('Still some time left');
                }
            }, 60000);

            $state.go("login");

        }

        if (authentication.isAuthenticated()) {
            loginSuccess();
        }

        $rootScope.$on('login:Successful', function() {
            loginSuccess();
        });

        function showError(message) {
            notifier.error(message);
        }

        vm.logout = function() {
            authentication.logout()
                .then(function(response) {

                    stopInterval();
                    localStorage.remove('tokenExpiration');
                    vm.loggedIn = false;
                    vm.isAdmin = false;

                    notifier.success('Logout successful!');
                    $state.go('login');
                })
                .catch(showError);
        };

    }

    angular.module('app')
        .controller('HeaderController', ['authentication', 'notifier', '$state', '$rootScope', 'localStorage', '$window', '$interval', '$log', HeaderController]);

}());