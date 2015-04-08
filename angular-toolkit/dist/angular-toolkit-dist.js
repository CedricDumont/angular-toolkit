(function () {
    'use strict';

    var OPENID_CONFIGURATION_ENDPOINT = '/.well-known/openid-configuration';

    var REDIRECTING_URI = '/openid-redirect/';
    
    var LOGOUT_REDIRERCT_URI = '/openid-logout/';


    //defining the module
    var module = angular.module('angular-toolkit-auth', [
        'ngRoute',
        'angular-toolkit-http-utils',
        'angular-toolkit-object-utils',
        'angular-toolkit-storage',
        'angular-toolkit-notification',
        'angular-toolkit-random'

    ]);

    module.run(function ($templateCache) {
        $templateCache.put('callback.html', '<div ng-controller="atOpenIdCallbackCtrl as vm">{{vm.message}}</div>');
    });

    module.config(['$routeProvider',
      function ($routeProvider) {
            $routeProvider.
            when(REDIRECTING_URI + ':token', {
                templateUrl: 'callback.html'
            });
    }]);

    /*
     * TODO :  I should rewrite to be able to use outside of angular context?
     */
    function OpenIdConfiguration(config, $location) {

        var baseRef = config.baseAppRef;

        var discoveryFile = config.discoveryFile;

        var clientId = config.clientId;

        var store = config.store;

        angular.extend(this, discoveryFile);


        /* var config = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
*/
        this.currentAccessToken = undefined;

        this.isScopeSupported = function (scope) {
            var result = false;

            this.scopes_supported.every(function (supportedScope) {
                if (supportedScope === scope) {
                    result = true;
                    return;
                }
            });

            return result;
        };

        this.createRootUrl = function () {
            var rootUrl = $location.protocol();

            rootUrl += '://';

            rootUrl += $location.host();

            rootUrl += ':' + $location.port();

            rootUrl += '/';

            rootUrl += baseRef;

            rootUrl += '#';

            rootUrl += REDIRECTING_URI;

            return rootUrl;
        };


        this.generateAuthorizeUrl = function (returnAsObject) {

            //generate states and nonce
            var generatedState = randomString();
            var generatedNonce = randomString();

            //save state and nonce for later checks
            saveState(generatedState);
            saveNonce(generatedNonce);

            var data = {
                client_id: clientId,
                response_type: 'id_token token',
                redirect_uri: this.createRootUrl(),
                scope: 'openid profile',
                state: generatedState,
                nonce: generatedNonce
            };

            var authorizeUrl = {
                data: data,
                url: this.authorization_endpoint,
                get value() {
                    return this.url + '?' + formEncode(this.data);
                }
            };

            if (returnAsObject) {
                return authorizeUrl;
            } else {
                return authorizeUrl.value;
            }


        };

        this.generateLogoutUrl = function (id_token, returnAsObject) {
            if (!this.end_session_endpoint) {
                throw new AuthException('No end_session_endpoint defined in the discovery document');
            }

            var logoutUrl = {
                data: {
                    id_token_hint: id_token,
                    post_logout_redirect_uri: 'http://localhost:8000/demoApp/index.html/'
                },
                url: this.end_session_endpoint,
                get value() {
                    return this.url + '?' + formEncode(this.data);
                }
            };
            
            //console.log(logoutUrl);

            if (returnAsObject) {
                return logoutUrl;
            } else {
                return logoutUrl.value;
            }

        };

        this.saveToken = function () {

        };

        this.challengeState = function (state) {
            var currentState = store.get(clientId + '-state');

            if (currentState === state) {
                return true;
            }

            return false;
        };

        function saveState(state) {
            store.add(clientId + '-state', state);
        }

        this.challengeNonce = function (nonce) {
            var currentNonce = store.get(clientId + '-nonce');

            if (currentNonce === nonce) {
                return true;
            }

            return false;
        };

        function saveNonce(nonce) {
            store.add(clientId + '-nonce', nonce);
        }

        function formEncode(data) {

            var str = [];

            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }

        function randomString() {
            /* jshint -W016 */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            var result = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

            return result;
            /* jshint +W016 */
        }

    }


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

    module.controller('atOpenIdCallbackCtrl', ['$routeParams', 'auth',
                            function ($routeParams, auth) {

            var vm = this;
            vm.message = $routeParams.token;
            auth.handleResponse($routeParams.token);

    }]);


    module.provider('auth', function () {
        var authenticationTypes = ['Bearer']; // could be 'Basic', 'Cookies' ..
        var _authenticationType = '';
        var _postLoginRedirection;

        this.setAuthenticationType = function (authType) {
            _authenticationType = authType;
        };
        
        this.setPostLoginRedirection = function (postLoginRedirection) {
            _postLoginRedirection = postLoginRedirection;
        };

        this.$get = ['loginRedirect', 'principal', 'notifier', '$window', 'openId', 'httpUtils', 
                            function (loginRedirect, principal, notifier, $window, openId, httpUtils) {

                //Configure the auth type
                principal.setAuthenticationType(_authenticationType);
                                
                var lastLoginPath;

                return {
                    login: login,
                    logout: logout,
                    handleResponse: handleResponse
                };

                function logout() {
                    principal.setProfile('', '', '');
                    redirectBrowserTo(openId.getConfiguration().generateLogoutUrl(principal.identity.id_token));
                }

                function login(username, password) {

                    lastLoginPath = $window.location.href;
                    //CREATE a browser service (what if I want to login with a popup window.... 
                    //i would like to handle that)
                    redirectBrowserTo(openId.getConfiguration().generateAuthorizeUrl());

                }

                function handleResponse(response) {
                    var decodedResponse = httpUtils.decodeURL(response);

                    principal.setProfile('TOBEFOUNDSOMEWWHERE', decodedResponse.access_token, decodedResponse.id_token);

                    _postLoginRedirection = _postLoginRedirection || lastLoginPath;
                    
                    redirectBrowserTo(_postLoginRedirection);

                }

                function redirectBrowserTo(url) {
                    $window.location.href = url;
                }


                /*function loginOauth2(username, password) {

                    var config = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };

                    var data = httpUtils.formEncode({
                        username: username,
                        password: password,
                        grant_type: 'password',
                        scope: 'openid',
                        client_id: 'MyAppClientId',
                        client_secret: '21B5F798-BE55-42BC-8AA8-0025B903DC3B'
                    });

                    var result =
                        $http({
                            method: 'POST',
                            url: tokenEndpoint,
                            headers: config,
                            data: data
                        })
                        .success(function (data, status, headers, config) {

                            console.log(data);

                            objectUtils.assertProperty(data, 'access_token');

                            principal.setProfile(username, data.access_token);

                            loginRedirect.redirectPostLogin();
                        })
                        .error(function (data, status, headers, config) {
                            throw new AuthException('could not login, received a ' +
                                status + ' code from server [' + data + ']');
                        });

                    return result;
                    //return data;
                }*/
                            }];

    });

    module.provider('principal', function () {

        this.$get = ['storage', 'notifier', function (storage, notifier) {

            var IDENTITY_KEY = 'Identity';

            var identity = initialize();

            var authenticationInfo = [];

            return {
                identity: identity,
                setProfile: setProfile,
                setAuthenticationType: setAuthenticationType,
                remove: remove
            };

            function remove() {
                notifier.addDebug('remove principal');
                storage.remove(IDENTITY_KEY);
                identity = initialize();
            }

            function setAuthenticationType(authType) {
                identity.authenticationType = authType;
            }


            function initialize() {
                var identity = {
                    name: '',
                    token: '',
                    id_token :'',
                    authenticationType: 'None',
                    get isAuthenticated() {
                        if (this.token) {
                            return true;
                        }
                        return false;
                    }
                };

                var localIdentity = storage.get(IDENTITY_KEY);

                if (localIdentity) {
                    notifier.addDebug('fill from localstorage');
                    identity.name = localIdentity.name;
                    identity.authenticationType = localIdentity.authenticationType;
                    identity.token = localIdentity.token;
                    identity.id_token = localIdentity.id_token;
                }

                return identity;

            }

            function setProfile(username, access_token, id_token) {
                identity.name = username;
                identity.token = access_token;
                identity.id_token = id_token;
                notifier.addDebug('add profile to storage');
                storage.add(IDENTITY_KEY, identity);
            }

        }];
    });


    module.provider('openId', function () {

        var _authorityEndpoint = '';

        this.setAuthorityEndpoint = function (authorityEndpoint) {
            _authorityEndpoint = authorityEndpoint;
        };

        var _baseAppRef = '';

        this.setBaseAppRef = function (baseAppRef) {
            _baseAppRef = baseAppRef;
        };

        this.$get = ['$http', '$q', 'storage', '$location', function ($http, $q, storage, $location) {

            var discoveryEndpoint = _authorityEndpoint + OPENID_CONFIGURATION_ENDPOINT;

            var initializePromise;

            var isInitialized = false;

            var _configuration;

            initialize();

            return {
                authorityEndpoint: _authorityEndpoint,
                getConfiguration: getConfiguration,
            };

            function initialize() {
                if (initializePromise) {
                    return initializePromise;
                }

                initializePromise = $http.get(discoveryEndpoint).success(success).error(error);


                /* initializePromise =
                     fileLoadingPromise*/

                function success(data) {

                    var config = {
                        discoveryFile: data,
                        store: storage,
                        baseAppRef: _baseAppRef,
                        clientId: 'implicitclient'
                    };
                    _configuration = new OpenIdConfiguration(config, $location);

                    isInitialized = true;
                }

                function error() {
                    _configuration = null;
                    isInitialized = false;
                    throw new Error('error while getting data');
                }

                return initializePromise;
            }



            function getConfiguration() {
                //return initialize().then(function () {
                return _configuration;
                //});
            }

        }];
    });

    module.factory('requestAuthenticator', ['$q', 'principal', function ($q, principal) {
        return {
            request: request,
            response: response
        };

        function request(config) {
            /*console.log('request');
            console.log(config);*/
            if (principal.identity.isAuthenticated) {
                config.headers.Authorization = 'Bearer ' + principal.identity.token;
            }
            return $q.when(config);
        }

        function response(resp) {
            /*console.log('response');
            console.log(resp);*/
            return $q.when(resp);
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

    module.directive('atPrincipal', ['principal', function (principal) {

        return {
            restrict: 'E',
            template: 'principal is logged in {{loggedIn}}',
            scope: {},
            link: function (scope, element, attrs) {
                scope.loggedIn = principal.identity.isAuthenticated;
            }
        };

    }]);



})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-http-utils', []);
    //added for commit 2

    module.factory('httpUtils', [function () {

        return {
            formEncode: formEncode,
            decodeURL: decodeURL
        };

        function formEncode(data) {

            var str = [];

            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

        function decodeURL(urlToDecode) {

            var obj = {};
            var pairs = urlToDecode.split('&');
            for (var i in pairs) {
                var split = pairs[i].split('=');
                obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
            }
            
            return obj;
            /*  var search = urlToDecode;
              var result = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                  function (key, value) {
                      var result = key === '' ? value : decodeURIComponent(value);
                      return result;
                  }) : {};

              return result;*/

        }

    }]);

})();
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

    var module = angular.module('angular-toolkit-random', []);
    // credit of this goes to : http://jsperf.com/uuid-generator-opt/4

    module.factory('UUID', [function () {

        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }

        return {
            newUUID: newUUID
        };

        
        function newUUID() {
            /* jshint -W016 */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            var result = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

            return result;
            /* jshint +W016 */
        }

    }]);

})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-storage', []);

    /* defining services */

    module.factory('storage', ['$window', function ($window) {

        var prefix = 'at';
        var store = $window.localStorage;
        return {
            add: add,
            get: get,
            remove: remove,
            count: count,
            clear: clear,
            items: items
        };

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(buildKey(key), value);
        }

        function items() {
            var result = [];

            for (var key in store) {
                result.push({
                    key: key,
                    value: store[key]
                });
            }

            return result;

        }

        function get(key) {
            var value = store.getItem(buildKey(key));

            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(buildKey(key));
        }

        function count() {
            return store.length;
        }

        function clear() {
            store.clear();
        }

        function buildKey(key) {
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