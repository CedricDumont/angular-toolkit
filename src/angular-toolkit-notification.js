(function () {
    'use strict';

    var module = angular.module('angular-toolkit-notification', []);

    /* defining services */

    module.factory('notifier', ['$timeout', function ($timeout) {

        var currentNotifications = [];
        var notificationTypes = ['info', 'success', 'error','warning'];
        var timeout = 5000;

        return {
            notifications: currentNotifications,
            notificationTypes: notificationTypes,
            addWarning: addWarning,
            addError: addError,
            addInfo: addInfo,
            addDebug : addDebug,
            addSuccess: addSuccess,
            remove : remove,
            getErrorHandler : getErrorHandler
        };
        
        function remove(notification){
            for (var i=0;i < currentNotifications.length;i++){
                if(currentNotifications[i] === notification){
                    currentNotifications.splice(i,1);
                }
            }
        }
        
        function getErrorHandler(description)
        {
            return function(){
                addError(description);
            };
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
        
        function addDebug(message) {
            add('debug', message);
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
            template: '<div ng-repeat="notification in notifications">' + 
                        '{{notification.type}} - {{notification.message}}</div>',
            link: function (scope) {
                scope.notifications = notifier.notifications;
            }

        };

    }]);

})();