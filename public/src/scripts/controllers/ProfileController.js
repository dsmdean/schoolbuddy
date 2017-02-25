(function() {
    'use strict';

    function ProfileController(authentication, userService, schoolService, teacherService, notifier, $state) {

        var vm = this;
        vm.defaultImg = "http://1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png";
        vm.currentUser = authentication.getCurrentUser();
        vm.currentSchool = authentication.getCurrentSchool();
        vm.currentTeacher = authentication.getCurrentTeacher();
        vm.updatePassword = false;
        vm.loading = false;

        function showError(message) {
            vm.loading = false;
            notifier.error(message);
        }

        vm.toggleUpdatePassword = function() {
            vm.updatePassword = !vm.updatePassword;
        }

        function updateUser() {
            vm.loading = true;
            userService.updateUser(vm.currentUser)
                .then(function(response) {
                    if (response !== undefined) {
                        notifier.success(response);
                        vm.updatePassword = false;
                        vm.loading = false;
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

        vm.updateSchool = function() {
            vm.loading = true;
            schoolService.updateSchool(vm.currentSchool)
                .then(function(response) {
                    notifier.success('School named ' + response.name + ' updated');
                    vm.loading = false;
                })
                .catch(showError);
        }

        vm.updateTeacher = function() {
            vm.loading = true;
            teacherService.updateTeacher(vm.currentTeacher)
                .then(function(response) {
                    notifier.success('Teacher named ' + response.firstname + ' ' + response.lastname + ' updated');
                    authentication.setCurrentTeacher(response);
                    vm.loading = false;
                })
                .catch(showError);
        }

    }

    angular.module('app')
        .controller('ProfileController', ['authentication', 'userService', 'schoolService', 'teacherService', 'notifier', '$state', ProfileController]);

}());