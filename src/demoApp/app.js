(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        //'angular-toolkit',
        'angular-toolkit-auth',
        'angular-toolkit-notification'
    ]);

    app.config(['$routeProvider',
      function ($routeProvider) {
            console.log('config routes');
            $routeProvider.
            when('/login', {
                templateUrl: 'login.html'
            }).
            when('/callApi', {
                templateUrl: 'callApi.html',
            }).
            when('/notifications', {
                templateUrl: 'notifications.html',
            }).
            when('/interpolation', {
                templateUrl: 'interpolation.html',
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);

    app.config(function (authProvider) {
      /*  https://localhost:44333/core/connect/authorize
        authProvider.setTokenEndpoint('https://localhost:44333/connect/token');
       */ 
        authProvider.setTokenEndpoint('https://localhost:44333/connect/authorize');
    });


    app.controller('demoCtrl', ['$rootScope', '$http', '$location', 'auth', 'principal', 'notifier',
                                function ($rootScope, $http, $location, auth, principal, notifier) {
            var vm = this;
            vm.username = 'testUser';
            vm.password = 'testPwd';
            vm.loggedIn = principal.identity.isAuthenticated;
            vm.apiMessage = 'not called yet';
            vm.notificationMsg = '';
            vm.addNotification = addNotification;
            vm.throwException = throwException;
            vm.message = 'some message';

            vm.login = login;
            vm.logout = logout;
            vm.callApi = callApi;
            vm.goToCallApi = goToCallApi;

            function logout() {
                
                auth.logout();
                
                vm.loggedIn = false;
                
                notifier.addDebug('logged out user logged in ?' + principal.identity.isAuthenticated);
                notifier.addDebug(principal.identity);
            }

            function login() {
                console.log(vm.username);
                auth.login(vm.username, vm.password).then(function (data) {
                    vm.loggedIn = principal.identity.isAuthenticated;
                    notifier.addSuccess('loggedIn' + vm.loggedIn);
                }).catch(notifier.getErrorHandler('error while logged in'));
            }

            function goToCallApi() {
                console.log('go to api');
                $location.path('/callApi');
            }

            function callApi() {
                $http.get('http://localhost:3000/test').then(function (data) {
                    notifier.addInfo('received data');
                    vm.apiMessage = data;

                }).catch(notifier.getErrorHandler('caugth error while calling api'));
            }

            function throwException() {
                throw new Error('my own exception');
            }

            function addNotification() {
                notifier.addInfo(vm.notificationMsg);
            }
    }]);
})();