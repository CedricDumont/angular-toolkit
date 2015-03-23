(function () {
    'use strict';

    //defining the module
    var module = angular.module('angular-toolkit-auth', [
        'angular-toolkit-http-utils',
        'angular-toolkit-object-utils',
        'angular-toolkit-storage',
        'angular-toolkit-notification'
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

    module.provider('auth', function () {
        var tokenEndpoint = '';
        var authenticationTypes = ['Bearer']; // could be 'Basic', 'Cookies' ..
        var _authenticationType = '';

        this.setTokenEndpoint = function (endpoint) {
            tokenEndpoint = endpoint;
        };

        this.setAuthenticationType = function (authType) {
            _authenticationType = authType;
        };


        this.$get = ['$http', 'httpUtils', 'objectUtils', 'loginRedirect', 'principal', 'notifier',
                            function ($http, httpUtils, objectUtils, loginRedirect, principal, notifier) {

                //Configure the auth type
                principal.setAuthenticationType(_authenticationType);

                return {
                    login: login,
                    logout: logout,
                    endpoint: endpoint
                };

                function endpoint() {
                    return tokenEndpoint;
                }

                function logout() {
                    principal.setProfile('', '');
                }

                function login(username, password) {

                    var config = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };

                    var data = httpUtils.formEncode({
                        client_id: 'implicitclient',
                        response_type :'token',                        
                        redirect_uri : 'http://localhost:8000/demoApp/index.html',
                        scope: 'api1',
                        state : '123',
                        nonce:'12345'
                    });

                    var result =
                        $http({
                            method: 'GET',
                            url: tokenEndpoint + '?' + data,
                            headers: config,
                            //data: data
                        })
                        .success(function (data, status, headers, config) {

                            console.log(data);

                            objectUtils.assertProperty(data, 'access_token');

                            principal.setProfile(username, data.access_token);

                            loginRedirect.redirectPostLogin();
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error ' + data);
                            console.log(status);
                            throw new AuthException('could not login, received a ' +
                                status + ' code from server [' + data + ']');
                        });

                    return result;
                }


                function loginOauth2(username, password) {

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
                }

                return identity;

            }

            function setProfile(username, token) {
                identity.name = username;
                identity.token = token;
                notifier.addDebug('add profile to storage');
                storage.add(IDENTITY_KEY, identity);
            }

        }];
    });


    module.factory('requestAuthenticator', ['$q', 'principal', function ($q, principal) {
        return {
            request: request,
        };

        function request(config) {
            if (principal.identity.isAuthenticated) {
                config.headers.Authorization = 'Bearer ' + principal.identity.token;
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