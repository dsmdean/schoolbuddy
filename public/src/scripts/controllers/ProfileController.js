(function() {
    'use strict';

    function ProfileController(authentication, userService, notifier, $state) {

        var vm = this;
        vm.defaultImg = "http://1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png";
        vm.currentUser = authentication.getCurrentUser();
        vm.updatePassword = false;

        function showError(message) {
            notifier.error(message);
        }

        vm.toggleUpdatePassword = function() {
            vm.updatePassword = !vm.updatePassword;
        }

        function updateUser() {
            userService.updateUser(vm.currentUser)
                .then(function(response) {
                    if (response !== undefined) {
                        notifier.success(response.data.status);
                        vm.updatePassword = !vm.updatePassword;
                    }
                })
                .catch(showError);
        }

        vm.updateUser = function() {
            if (vm.updatePassword) {
                if (vm.currentUser.password === vm.currentUser.newPassword) {
                    notifier.error("Your old password is the same as your new password");
                } else if (vm.currentUser.newPassword !== vm.currentUser.confirmNewPassword) {
                    notifier.error("Your new password doesn't match the confirmed password");
                } else if (vm.currentUser.newPassword === vm.currentUser.confirmNewPassword) {
                    updateUser();
                }
            } else {
                updateUser();
            }
        }

    }

    angular.module('app')
        .controller('ProfileController', ['authentication', 'userService', 'notifier', '$state', ProfileController]);

}());