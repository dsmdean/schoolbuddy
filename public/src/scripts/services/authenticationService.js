(function() {
    'use strict';

    function authentication($q, $http, localStorage, $rootScope, schoolService, teacherService, studentService, classroomService, schoolyearService, notifier) {

        var TOKEN_KEY = 'Token';
        var SCHOOL_DATA = 'school_data';
        var TEACHER_DATA = 'teacher_data';
        var CLASSROOM_DATA = 'classroom_data';
        var STUDENT_DATA = 'student_data';
        var SCHOOLYEAR_DATA = 'schoolyear_data';
        var baseURL = 'http://localhost:3000';
        var loggedIn = false;
        var currentUser = {};
        var currentSchool = {};
        var currentTeacher = {};
        var currentClassroom = {};
        var currentStudent = {};
        var currentYear = {};
        var admin = false;
        var school_admin = false;
        var teacher = false;
        var student = false;
        var authToken;

        function useCredentials(credentials) {
            currentUser = credentials;
            authToken = credentials.token;

            if (credentials.admin) {
                admin = true;
            } else if (credentials.school_admin) {
                school_admin = true;
                currentSchool = localStorage.getObject(SCHOOL_DATA, '{}');
            } else if (credentials.teacher) {
                teacher = true;
                currentTeacher = localStorage.getObject(TEACHER_DATA, '{}');
                currentClassroom = localStorage.getObject(CLASSROOM_DATA, '{}');
                currentYear = localStorage.getObject(SCHOOLYEAR_DATA, '{}');
            } else if (credentials.student) {
                student = true;
                currentStudent = localStorage.getObject(STUDENT_DATA, '{}');
            }

            loggedIn = true;
            $rootScope.$broadcast('login:Successful');

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

            if (school_admin) {
                schoolService.getSchoolByUserId(currentUser._id)
                    .then(function(response) {
                        currentSchool = response;
                        localStorage.storeObject(SCHOOL_DATA, currentSchool);
                    })
                    .catch(function(message) {
                        notifier.error(message);
                    });
            } else if (teacher) {
                teacherService.getTeacherByUserId(currentUser._id)
                    .then(function(response) {
                        currentTeacher = response;
                        localStorage.storeObject(TEACHER_DATA, currentTeacher);

                        schoolyearService.getCurrentYear()
                            .then(function(response) {
                                currentYear = response;
                                localStorage.storeObject(SCHOOLYEAR_DATA, response);

                                classroomService.getClassroomByTeacher(currentTeacher._id, currentYear._id)
                                    .then(function(classroom) {
                                        currentClassroom = classroom;
                                        localStorage.storeObject(CLASSROOM_DATA, classroom);
                                    })
                                    .catch(function(message) {
                                        notifier.error(message);
                                    });
                            })
                            .catch(function(message) {
                                notifier.error(message);
                            });
                    })
                    .catch(function(message) {
                        notifier.error(message);
                    });
            } else if (student) {
                studentService.getStudentByUserId(currentUser._id)
                    .then(function(response) {
                        currentStudent = response;
                        localStorage.storeObject(STUDENT_DATA, currentStudent);
                    })
                    .catch(function(message) {
                        notifier.error(message);
                    });
            }

            useCredentials(credentials);
        }

        function destroyUserCredentials() {
            authToken = undefined;
            currentUser = {};
            loggedIn = false;
            admin = false;
            $http.defaults.headers.common['x-access-token'] = authToken;
            localStorage.remove(TOKEN_KEY);
            localStorage.remove('tokenExpiration');

            if (school_admin) {
                school_admin = false;
                localStorage.remove(SCHOOL_DATA);
            } else if (teacher) {
                teacher = false;
                localStorage.remove(TEACHER_DATA);
                localStorage.remove(CLASSROOM_DATA);
                localStorage.remove(SCHOOLYEAR_DATA);
            } else if (student) {
                student = false;
                localStorage.remove(STUDENT_DATA);
            }
        }

        function loginSuccess(response) {
            currentUser = response.data.user;

            if (response.data.user.admin) {
                admin = true;
                storeUserCredentials({ id: response.data.user._id, firstname: response.data.user.firstname, lastname: response.data.user.lastname, username: response.data.user.username, token: response.data.token, admin: response.data.user.admin });
            } else if (response.data.user.school_admin) {
                school_admin = true;
                storeUserCredentials({ id: response.data.user._id, firstname: response.data.user.firstname, lastname: response.data.user.lastname, username: response.data.user.username, token: response.data.token, school_admin: response.data.user.school_admin });
            } else if (response.data.user.teachers) {
                teacher = true;
                storeUserCredentials({ id: response.data.user._id, firstname: response.data.user.firstname, lastname: response.data.user.lastname, username: response.data.user.username, token: response.data.token, teacher: response.data.user.teachers });
            } else if (response.data.user.student) {
                student = true;
                storeUserCredentials({ id: response.data.user._id, firstname: response.data.user.firstname, lastname: response.data.user.lastname, username: response.data.user.username, token: response.data.token, student: response.data.user.student });
            }

            // $rootScope.$broadcast('login:Successful');

            return 'User logged in: ' + response.data.user.username;
        }

        function loginError(response) {
            return $q.reject(response.data.err);
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

        function getCurrentSchool() {
            return currentSchool;
        }

        function getCurrentTeacher() {
            return currentTeacher;
        }

        function getCurrentClassroom() {
            return currentClassroom;
        }

        function getCurrentStudent() {
            return currentStudent;
        }

        function getCurrentYear() {
            return currentYear;
        }

        function updateCurrentUser(user) {
            currentUser.firstname = user.firstname;
            currentUser.lastname = user.lastname;
            currentUser.username = user.username;

            localStorage.remove(TOKEN_KEY);
            localStorage.storeObject(TOKEN_KEY, currentUser);

            return currentUser;
        }

        function setCurrentTeacher(teacher) {
            currentTeacher = teacher;
            localStorage.remove(TEACHER_DATA);
            localStorage.storeObject(TEACHER_DATA, teacher);
        }

        function setCurrentClassroom(classroom) {
            currentClassroom = classroom;
            localStorage.remove(CLASSROOM_DATA);
            localStorage.storeObject(CLASSROOM_DATA, classroom);
        }

        function isAdmin() {
            return admin;
        }

        function isSchoolAdmin() {
            return school_admin;
        }

        function isTeacher() {
            return teacher;
        }

        function isStudent() {
            return student;
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
            getCurrentSchool: getCurrentSchool,
            getCurrentTeacher: getCurrentTeacher,
            updateCurrentUser: updateCurrentUser,
            setCurrentTeacher: setCurrentTeacher,
            setCurrentClassroom: setCurrentClassroom,
            getCurrentClassroom: getCurrentClassroom,
            getCurrentStudent: getCurrentStudent,
            getCurrentYear: getCurrentYear,
            isAdmin: isAdmin,
            isSchoolAdmin: isSchoolAdmin,
            isTeacher: isTeacher,
            isStudent: isStudent,
            getDate: getDate
        };
    }

    angular.module('app')
        .factory('authentication', ['$q', '$http', 'localStorage', '$rootScope', 'schoolService', 'teacherService', 'studentService', 'classroomService', 'schoolyearService', 'notifier', authentication]);

}());