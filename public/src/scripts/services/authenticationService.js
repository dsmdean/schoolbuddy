(function() {
    'use strict';

    function authentication($q, $http, localStorage, $rootScope) {

        var TOKEN_KEY = 'Token';
        var baseURL = 'http://localhost:3000';
        var loggedIn = false;
        var currentUser = {};
        var admin = false;
        var authToken;

        function useCredentials(credentials) {
            loggedIn = true;
            currentUser = credentials;
            authToken = credentials.token;

            if (credentials.admin) {
                admin = true;
            }

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
        }

        function loadUserCredentials() {
            var credentials = localStorage.getObject(TOKEN_KEY, '{}');
            if (credentials.username !== undefined) {
                useCredentials(credentials);
            }
        }

        function storeUserCredentials(credentials) {
            localStorage.storeObject(TOKEN_KEY, credentials);
            useCredentials(credentials);
        }

        function destroyUserCredentials() {
            authToken = undefined;
            currentUser = {};
            loggedIn = false;
            admin = false;
            $http.defaults.headers.common['x-access-token'] = authToken;
            localStorage.remove(TOKEN_KEY);
        }

        function loginSuccess(response) {
            loggedIn = true;
            currentUser = response.data.user;

            if (response.data.user.admin) {
                storeUserCredentials({ id: response.data.user._id, firstname: response.data.user.firstname, lastname: response.data.user.lastname, username: response.data.user.username, token: response.data.token, admin: response.data.user.admin });
                admin = true;
            }

            $rootScope.$broadcast('login:Successful');

            return 'User logged in: ' + response.data.user.username;
        }

        function loginError(response) {
            return $q.reject('Error logging in. (HTTP status: ' + response.status + ').');
        }

        function login(loginData) {
            return $http.post(baseURL + '/api/users/login', loginData)
                .then(loginSuccess)
                .catch(loginError);
        }

        function registerSuccess(response) {
            // login({ username: response.config.data.username, password: response.config.data.password });

            return 'User added: ' + response.config.data.username;
        }

        function registerError(response) {
            return $q.reject('Error registering user. (HTTP status: ' + response.status + ')');
        }

        function register(newUser) {

            return $http.post(baseURL + '/api/users/register', newUser)
                .then(registerSuccess)
                .catch(registerError);
        }

        function logoutSuccess(response) {
            destroyUserCredentials();

            return 'Logged out - ' + response.data.status;
        }

        function logoutError(response) {
            return $q.reject('Error logging out. (HTTP status: ' + response.status + ')');
        }

        function logout() {
            return $http.get(baseURL + '/api/users/logout')
                .then(logoutSuccess)
                .catch(logoutError);
        }

        function isAuthenticated() {
            return loggedIn;
        }

        function getCurrentUser() {
            return currentUser;
        }

        function updateCurrentUser(user) {
            currentUser.firstname = user.firstname;
            currentUser.lastname = user.lastname;
            currentUser.username = user.username;

            localStorage.remove(TOKEN_KEY);
            localStorage.storeObject(TOKEN_KEY, currentUser);

            return currentUser;
        }

        function isAdmin() {
            return admin;
        }

        function getDate() {
            if (tokenExpiration.date !== undefined) {
                return tokenExpiration.date;
            } else {
                return null;
            }
        }

        loadUserCredentials();

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getCurrentUser: getCurrentUser,
            updateCurrentUser: updateCurrentUser,
            isAdmin: isAdmin,
            getDate: getDate
        };
    }

    angular.module('app')
        .factory('authentication', ['$q', '$http', 'localStorage', '$rootScope', authentication]);

}());