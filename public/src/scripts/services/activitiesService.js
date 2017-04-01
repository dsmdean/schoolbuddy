(function() {
    'use strict';

    function activitiesService(notifier, $http, $log, cacheService, $rootScope) {

        var baseURL = 'http://localhost:3000';

        function getAllActivities() {
            return $http.get(baseURL + '/api/activities', {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function getActivitiesBySchool(schoolID) {
            $rootScope.schoolID = schoolID;
            return $http.get(baseURL + '/api/activities/school/' + schoolID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function getActivitiesByClassroom(classroomID) {
            $rootScope.classroomID = classroomID;
            return $http.get(baseURL + '/api/activities/classroom/' + classroomID, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function getActivitiesByTeacher(teacherID, year) {
            $rootScope.teacherID = teacherID;
            $rootScope.yearID = year;
            return $http.get(baseURL + '/api/activities/teacher/' + teacherID + '/' + year, {
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function setActivityOnHold(activityID, hold) {
            cacheService.deleteActivitiesBySchool();
            return $http.put(baseURL + '/api/activities/' + activityID, { "hold": !hold })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function registerActivity(newActivity) {
            cacheService.deleteActivitiesByClassroom();
            return $http.post(baseURL + '/api/activities', newActivity)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error registering activity: ' + response.statusText);
                    return $q.reject('Error registering activity.');
                });
        }

        function updateActivity(activity) {
            cacheService.deleteActivitiesByClassroom();
            return $http.put(baseURL + '/api/activities/' + activity._id, activity)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error updating activity: ' + response.statusText);
                    return $q.reject('Error updating activity.');
                });
        }

        function deleteActivity(activityID) {
            cacheService.deleteActivitiesByClassroom();
            return $http.delete(baseURL + '/api/activities/' + activityID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error deleting activity: ' + response.statusText);
                    return $q.reject('Error deleting activity.');
                });
        }

        return {
            getAllActivities: getAllActivities,
            getActivitiesBySchool: getActivitiesBySchool,
            getActivitiesByClassroom: getActivitiesByClassroom,
            getActivitiesByTeacher: getActivitiesByTeacher,
            setActivityOnHold: setActivityOnHold,
            registerActivity: registerActivity,
            updateActivity: updateActivity,
            deleteActivity: deleteActivity
        };
    }

    angular.module('app')
        .factory('activitiesService', ['notifier', '$http', '$log', 'cacheService', '$rootScope', activitiesService]);

}());