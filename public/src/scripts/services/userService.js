(function() {
    'use strict';

    function userService(notifier, $http, authentication) {

        var baseURL = 'http://localhost:3000';

        function showError(message) {
            notifier.error(message.data.err);
        }

        function updateUser(user) {
            if (user.newPassword == undefined) {
                return $http({
                        method: 'PUT',
                        url: baseURL + '/api/users/' + user.id,
                        data: user
                    })
                    .then(function(response) {
                        authentication.updateCurrentUser(user);
                        return 'User updated: ' + response.config.data.username;
                    })
                    .catch(showError);
            } else {
                return $http({
                        method: 'PUT',
                        url: baseURL + '/api/users/' + user.id + '/setPassword',
                        data: user
                    })
                    .then(function(response) {
                        authentication.updateCurrentUser(user);
                        return 'User updated: ' + response.config.data.username;
                    })
                    .catch(showError);
            }
        }

        return {
            updateUser: updateUser
        };
    }

    angular.module('app')
        .factory('userService', ['notifier', '$http', 'authentication', userService]);

}());