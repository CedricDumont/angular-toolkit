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
        authProvider.setTokenEndpoint('https://localhost:44333/connect/token');
    });


    /*app.run([
          '$rootScope',
          function ($rootScope) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                // next is an object that is the route that we are starting to go to
                // current is an object that is the route where we are currently
                var currentPath = current.originalPath;
                var nextPath = next.originalPath;

                console.log('Starting to leave %s to go to %s', currentPath, nextPath);
            });

            $rootScope.$on('$routeChangeError', function (event, next, current) {
                // next is an object that is the route that we are starting to go to
                // current is an object that is the route where we are currently
                var currentPath = current.originalPath;
                var nextPath = next.originalPath;

                console.log('Error to leave %s to go to %s', currentPath, nextPath);
            });
      }
    ]);
    */

    app.controller('testCtrl', ['$rootScope', '$http', '$location', 'auth', 'currentUser', 'notifier',
                                function ($rootScope, $http, $location, auth, currentUser, notifier) {
            var vm = this;
            vm.username = 'testUser';
            vm.password = 'testPwd';
            vm.loggedIn = currentUser.profile.loggedIn;
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
                
                notifier.addDebug('logged out user logged in ?' + currentUser.profile.loggedIn);
                notifier.addDebug(currentUser.profile);
            }

            function login() {
                console.log(vm.username);
                auth.login(vm.username, vm.password).then(function (data) {
                    vm.loggedIn = currentUser.profile.loggedIn;
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