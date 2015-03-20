(function () {
    'use strict';

    var module = angular.module('angular-toolkit-notification', []);

    /* defining services */

    module.factory('notifier', ['$timeout', function ($timeout) {

        var currentNotifications = ['none'];
        var notificationTypes = ['info', 'success', 'error','warning'];
        var timeout = 5000;

        return {
            notifications: currentNotifications,
            notificationTypes: notificationTypes,
            addWarning: addWarning,
            addError: addError,
            addInfo: addInfo,
            addSuccess: addSuccess,
            remove : remove
        };
        
        function remove(notification){
            for (var i=0;i < currentNotifications.length;i++){
                if(currentNotifications[i] === notification){
                    currentNotifications.splice(i,1);
                }
            }
        }

        function addWarning(message) {
            add('warning', message);
        }

        function addError(message) {
            add('error', message);
        }

        function addInfo(message) {
            add('info', message);
        }

        function addSuccess(message) {
            add('success', message);
        }

        function add(type, message) {
            var notification = { type: type,message: message};
            
            currentNotifications.push(notification);
            
            $timeout(function(){
                remove(notification);                
            }, timeout);
            
            
        }
    }]);

    module.directive('atNotifications', ['notifier', function (notifier) {
        return {
            restrict: 'AE',
            scope: {},
            template: '{{notifications}}',
            link: function (scope) {
                scope.notifications = notifier.notifications;
            }

        };

    }]);

})();