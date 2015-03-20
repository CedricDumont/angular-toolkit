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