(function () {
    'use strict';

    //defining the module
    var module = angular.module('angular-toolkit-auth', [
        'angular-toolkit-http-utils',
        'angular-toolkit-object-utils',
        'angular-toolkit-storage'
    ]);

    //defining Exceptions Objects 
    function AuthException(message) {
        this.name = 'LoginException';
        this.message = message;
    }

    AuthException.prototype = new Error();
    AuthException.prototype.constructor = AuthException;


    //configure the module
    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('requestAuthenticator');
        $httpProvider.interceptors.push('loginRedirect');

    }]);


    //defining services
    module.factory('auth', ['$http', 'httpUtils', 'objectUtils', 'loginRedirect', 'currentUser',
                            function ($http, httpUtils, objectUtils, loginRedirect, currentUser) {

            return {
                login: login
            };

            function login(username, password) {

                var config = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                var data = httpUtils.formEncode({
                    username: username,
                    password: password,
                    grant_type: 'password',
                    scope: 'api1',
                    client_id: 'MyAppClientId',
                    client_secret: '21B5F798-BE55-42BC-8AA8-0025B903DC3B'
                });

                var result =
                    $http({
                        method: 'POST',
                        url: 'https://localhost:44333/connect/token',
                        headers: config,
                        data: data
                    })
                    .success(function (data, status, headers, config) {
                        objectUtils.assertProperty(data, 'access_token');

                        currentUser.setProfile(username, data.access_token);
                        loginRedirect.redirectPostLogin();
                    })
                    .error(function (data, status, headers, config) {
                        throw new AuthException('could not login, received a ' +
                            status + ' code from server [' + data + ']');
                    });

                return result;
                //return data;
            }

    }]);

    module.factory('currentUser', ['storage', function (storage) {

        var USERKEY = 'user';

        var profile = initialize();

        return {
            profile: profile,
            setProfile: setProfile
        };

        function initialize() {
            var user = {
                username: '',
                token: '',
                get loggedIn() {
                    if (this.token) {
                        return true;
                    }
                    return false;
                }
            };

            var localUser = storage.get(USERKEY);

            if (localUser) {
                user.username = localUser.username;
                user.token = localUser.token;
            }
            
            return user;

        }

        function setProfile(username, token) {
            profile.username = username;
            profile.token = token;
            storage.add(USERKEY, profile);
        }

    }]);

    module.factory('requestAuthenticator', ['$q', 'currentUser', function ($q, currentUser) {
        return {
            request: request,
        };

        function request(config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
            }
            return $q.when(config);
        }

    }]);

    module.factory('loginRedirect', ['$q', '$location', function ($q, $location) {
        var lastPath = '/';
        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin
        };

        function responseError(response) {
            if (response.status === 401) {
                lastPath = $location.path();
                $location.path('/login');
            }
            return $q.reject(response);

        }

        function redirectPostLogin() {
            $location.path(lastPath);
            lastPath = '/';
        }

    }]);



})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-http-utils', []);
    //added for commit 2

    module.factory('httpUtils', [function () {

        return {
            formEncode: formEncode
        };

        function formEncode(data) {
            
            var str = [];
            
            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

    }]);

})();

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
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-object-utils', []);

    /*defining Exceptions Objects */
    function ObjectException(message) {
        this.name = 'ObjectException';
        this.message = message;
    }

    ObjectException.prototype = new Error();
    ObjectException.prototype.constructor = ObjectException;

    /* defining services */

    module.factory('objectUtils', [function () {

        return {
            isPropertyDefined: isPropertyDefined,
            assertProperty : assertProperty
        };

        /*
         * @description Checks if an object contains a property (does not check on the parent chain)
         * @param {Object} obj the Object to check on.
         * @param {String} propertyName the name of the property.
         * @returns {boolean} true if the property is defined.
         */
        function isPropertyDefined(obj, propertyName) {
            return obj.hasOwnProperty(propertyName);
        }

               
        function assertProperty(obj, propertyName) {
           if(!isPropertyDefined(obj, propertyName))
           {
               throw new ObjectException(propertyName + ' is not defined on object : ' + obj);
           }
        }
        

    }]);

})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-storage', []);

    /* defining services */

    module.factory('storage', ['$window',function ($window) {

        var prefix = 'at';
        var store = $window.localStorage;

        return {
            add: add,
            get : get,
            remode:remove
        };
        
        function add(key, value){
            value = angular.toJson(value);
            store.setItem(buildKey(key), value);
        }
        
        function get(key){
            var value = store.getItem(buildKey(key));
            
            if(value){
                value = angular.fromJson(value);
            }
            return value;
        }
        
        function remove(key){
            store.removeItem(key);
        }
        
        function buildKey(key)
        {
            return prefix + '-' + key;
        }

    }]);

})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit', [
        'angular-toolkit-auth',
        'angular-toolkit-notification'
    ]);

    module.config(['$provide', function ($provide) {

        $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {
                //console.log('exception');
                $delegate(exception, cause);

                var myNotifier = $injector.get('notifier');
                myNotifier.addError(exception.message);
            };
        }]);

        $provide.decorator('$interpolate', ['$delegate', '$log', function ($delegate, $log) {
            var serviceWrapper = function () {

                var bindingFunction = $delegate.apply(this, arguments);

                if (angular.isFunction(bindingFunction) && arguments[0]) {
                    return bindingWrapper(bindingFunction, arguments[0].trim());
                }

                return bindingFunction;
            };

            var bindingWrapper = function (bindingFunction, bindingExpression) {
                return function () {

                    var result = bindingFunction.apply(this, arguments);

                    var trimmedResult = result.trim();

                    var log = trimmedResult ? $log.info : $log.warn;

                    log.call($log, 'binding of  ' + bindingExpression + ' = ' + trimmedResult);

                    return result;
                };
            };


            angular.extend(serviceWrapper, $delegate);

            return serviceWrapper;
        }]);

    }]);

})();