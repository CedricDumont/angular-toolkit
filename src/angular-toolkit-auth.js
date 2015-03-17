(function () {
    'use strict';

    var module = angular.module('angular-toolkit', ['angular-toolkit-http-utils']);

    module.factory('auth', ['$http', 'httpUtils', function ($http, httpUtils) {

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
                client_id:'MyAppClientId',
                client_secret:'21B5F798-BE55-42BC-8AA8-0025B903DC3B'
            });

            var result =
                $http({
                    method: 'POST',
                    url: 'https://localhost:44333/connect/token',
                    headers: config,
                    data: data
                })
                .success(function (data, status, headers, config) {
                    console.log(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                });

            return result;
            //return data;
        }

    }]);

})();