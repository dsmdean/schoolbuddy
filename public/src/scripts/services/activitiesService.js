(function() {
    'use strict';

    function activitiesService(notifier, $http, $log) {

        var baseURL = 'http://localhost:3000';

        function getAllActivities() {
            return $http.get(baseURL + '/api/activities')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function getActivitiesBySchool(schoolID) {
            return $http.get(baseURL + '/api/activities/school/' + schoolID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function getActivitiesByClassroom(classroomID) {
            return $http.get(baseURL + '/api/activities/classroom/' + classroomID)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving activities: ' + response.statusText);
                    return $q.reject('Error retrieving activities.');
                });
        }

        function setActivityOnHold(activityID, hold) {
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
            setActivityOnHold: setActivityOnHold,
            registerActivity: registerActivity,
            updateActivity: updateActivity,
            deleteActivity: deleteActivity
        };
    }

    angular.module('app')
        .factory('activitiesService', ['notifier', '$http', '$log', activitiesService]);

}());