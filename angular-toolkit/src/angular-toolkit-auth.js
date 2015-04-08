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

        var redirect_uri = config.redirect_uri;

        angular.extend(this, discoveryFile);

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

            if (this.redirect_uri) {
                return this.redirect_uri;
            }
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

    module.controller('atOpenIdCallbackCtrl', ['auth',
                            function (auth) {

            var vm = this;

            auth.handleResponse();

    }]);

    module.factory('idTokenValidator', ['$http', 'openId', function ($http, openId) {
        return {
            validate: validate,
            getCert: getCert
        };

        function validate(token) {
            var parts = token.split('.');

            var tokenHeader = JSON.parse(atob(parts[0]));
            var tokenBody = JSON.parse(atob(parts[1]));

            var certObject = getCert(tokenBody.iss);

            //var certificates = certObject.keys[0].x5c[0];           

            return tokenBody;
        }

        function getCert(issuer) {
            var certificates = openId.getConfiguration(issuer).certs;
            return certificates;
        }

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

        this.$get = ['$http', '$location', 'loginRedirect', 'principal', 'notifier', '$window',
                     'openId', 'httpUtils', 'idTokenValidator',
                        function ($http, $location, loginRedirect, principal, notifier, $window,
                openId, httpUtils, idTokenValidator) {

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
                    httpUtils.redirectBrowserTo(
                        openId.getConfiguration().generateLogoutUrl(principal.identity.id_token));
                }

                function login(providerName, username, password) {

                    console.log(openId.getConfiguration(providerName));

                    lastLoginPath = $window.location.href;

                    httpUtils.redirectBrowserTo(openId.getConfiguration(providerName).generateAuthorizeUrl());

                }

                function handleResponse() {

                    var responseHandlingInfo = {
                        isOpenId: false,

                    };

                    var browserUrl = $location.absUrl();

                    //check if it's an openid response                    
                    var isOpenId = openId.isOpenIdCallback(browserUrl);

                    if (isOpenId) {

                        responseHandlingInfo.isOpenId = true;

                        var idx = browserUrl.lastIndexOf('#');

                        if (idx >= 0) {
                            var queryString = browserUrl.substr(idx + 1);

                            //remove leading '/' if there is one.
                            if (queryString.startsWith('/')) {
                                queryString = queryString.substr(1);
                            }

                            var decodedResponse = httpUtils.decodeURL(queryString);

                            var token_contents = idTokenValidator.validate(decodedResponse.id_token);

                            principal.setProfile('Anonymous', decodedResponse.access_token, decodedResponse.id_token);

                            _postLoginRedirection = _postLoginRedirection || lastLoginPath;

                            if (openId.getConfiguration(token_contents.iss).userinfo_endpoint) {

                                $http.get(openId.getConfiguration(token_contents.iss).userinfo_endpoint)
                                    .then(function (data) {
                                        httpUtils.redirectBrowserTo(_postLoginRedirection);
                                        principal.setProfile(data.data.name,
                                            decodedResponse.access_token,
                                            decodedResponse.id_token);

                                    }).then()
                                    .catch(function (data) {
                                        console.log('error');
                                        console.log(data);
                                    });
                            }

                            //console.log(decodedResponse.access_token);




                        }
                    } else {
                        throw new Error('Auth scheme not currently supported for :' + browserUrl);
                    }

                    return responseHandlingInfo;
                }

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
                    id_token: '',
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

        var _config = {};

        this.config = function (configuration) {

            if (configuration.authority_endpoint) {
                _config[configuration.authority_endpoint] = configuration;
            } else {
                _config[configuration.issuer] = configuration;
            }

        };

        var _baseAppRef = '';

        this.setBaseAppRef = function (baseAppRef) {
            _baseAppRef = baseAppRef;
        };

        this.$get = ['$rootScope', '$http', '$q', 'storage', '$location',
                     function ($rootScope, $http, $q, storage, $location) {

                var initializePromise;

                var isInitialized = false;

                initialize();

                return {
                    authorityEndpoint: _config.authority_endpoint,
                    getConfiguration: getConfiguration,
                    initialize: initialize,
                    getConfig: getConfig,
                    isOpenIdCallback: isOpenIdCallback
                };

                function isOpenIdCallback(url) {
                    if (url.contains('id_token')) {
                        return true;
                    }
                    return false;
                }

                function getConfig(issuer) {
                    return _config[issuer];
                }

                function initialize() {

                    for (var key in _config) {

                        var currentConfig = getConfig(key);

                        if (currentConfig.authority_endpoint) {
                            var tempKey = key;
                            var discoveryEndpoint = currentConfig.authority_endpoint + OPENID_CONFIGURATION_ENDPOINT;
                            initializePromise = $http.get(discoveryEndpoint).then(function (data) {
                                var resultc = {
                                    name: tempKey,
                                    data: data.data
                                };

                                return resultc;
                            }).then(success1).catch(error);
                        } else {
                            var tempKey2 = key;

                            var deffered = $q.defer();

                            var result2 = {
                                name: tempKey2,
                                data: currentConfig
                            };

                            deffered.resolve(result2);

                            deffered.promise.then(success2).catch(error);

                        }

                    }

                    //this is not the good place : must be thrown after all promise are resolved
                    // use $q.whenAll to report initalization status to help debugging
                    $rootScope.$broadcast('AT-READY');

                    function success2(result2) {

                        var jwks_uri = result2.data.jwks_uri;

                        $http.get(jwks_uri).then(function (data) {

                            var configuration = {};

                            configuration.data = result2.data;
                            configuration.certs = data.data;

                            storage.add(result2.name + '-configuration', configuration);

                            isInitialized = true;

                        }).catch(function (data, status, headers, config) {
                            var configuration = {};

                            configuration.data = result2.data;

                            console.log('using preconfigured keys instead for ' + result2.name);

                            // at least check if keys were configured and use them in place
                            if (result2.data.keys) {

                                console.log('using preconfigured keys instead for ' + result2.name);

                                configuration.certs = result2.data.keys;
                            }
                            storage.add(result2.name + '-configuration', configuration);
                        });

                    }

                    function success1(result1) {

                        /*console.log('saving result1');
                        console.log(result1);*/
                        //load certificates
                        //console.log(result.data.jwks_uri);
                        var jwks_uri = result1.data.jwks_uri;

                        $http.get(jwks_uri).then(function (data) {

                            var configuration = {};

                            configuration.data = result1.data;
                            configuration.certs = data.data;

                            storage.add(result1.name + '-configuration', configuration);

                            isInitialized = true;

                        });

                    }

                    function error(data) {
                        var _configuration = null;
                        isInitialized = false;
                        console.log('could not initialize provider ' + data);
                    }
                }

                function getConfiguration(configName) {

                    var result = storage.get(configName + '-configuration');

                    var config = {
                        discoveryFile: result.data,
                        store: storage,
                        baseAppRef: _baseAppRef,
                        clientId: '3MVG9A_f29uWoVQsOJ33xZnEcrNSg0uWCIbXeiTXTwMleZuYoekI6B.XgKJ3bJ1PPAib9TLX.EYfC004ZUBvw' // jshint ignore:line
                            //clientId: '116616979000-bu0mthqdsfqe7pn794eamhucf4gvc1t6.apps.googleusercontent.com'
                            //clientId: 'implicitclient'
                    };

                    config.discoveryFile.certs = result.certs;

                    var opeidconfig = new OpenIdConfiguration(config, $location);

                    return opeidconfig;
                }

        }];
    });

    module.factory('requestAuthenticator', ['$q', 'principal', function ($q, principal) {
        return {
            request: request,
            response: response
        };

        function request(config) {
            if (principal.identity.isAuthenticated) {
                //console.log('add token : ' + principal.identity.token);
                config.headers.Authorization = 'Bearer ' + principal.identity.token;
            }
            return $q.when(config);
        }

        function response(resp) {
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

    module.directive('atReady', ['principal', function (principal) {

        return {
            restrict: 'AE',
            template: 'aithentication toolkit is ready :  {{atReady}}',
            link: function (scope, element, attrs) {

                scope.atReady = false;

                scope.$on('AT-READY', function () {
                    scope.atReady = true;
                });

            }
        };

    }]);






})();