(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        //'angular-toolkit',
        'angular-toolkit-auth',
        'angular-toolkit-auth-config',
        'angular-toolkit-notification'
    ]);

    app.config(['$routeProvider',
      function ($routeProvider) {
            console.log('config routes');
            $routeProvider.
            when('/login', {
                templateUrl: 'login.html'
            }).
            when('/loggedIn', {
                templateUrl: 'loggedIn.html'
            }).
            when('/callApi', {
                templateUrl: 'callApi.html'
            }).
            when('/notifications', {
                templateUrl: 'notifications.html'
            }).
            when('/interpolation', {
                templateUrl: 'interpolation.html'
            }).
            when('/storage', {
                templateUrl: 'storage.html'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);

   
    app.config(function (authProvider, openIdProvider) {
        authProvider.setPostLoginRedirection('http://localhost:8000/demoApp/#/loggedIn');
        openIdProvider.setBaseAppRef('demoApp/index.html');
    });

    app.controller('callbackCtrl', ['$routeParams', '$http', '$location', 'auth', 'principal', 'notifier',
                                function ($routeParams, $http, $location, auth, principal, notifier) {
            var vm = this;
            vm.message = $routeParams.token;

    }]);
    
    
    
    
    app.controller('demoCtrl', [
        '$rootScope', '$routeParams', '$http', '$location', 'auth', 'principal', 
        'notifier', 'openId', 
        function ($rootScope, $routeParams, $http, $location, auth, principal, 
                   notifier, openId) {
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
            vm.loginWithGoogle = loginWithGoogle;
            vm.loginWithSalesForce = loginWithSalesForce;
            vm.logout = logout;
            vm.callApi = callApi;
            vm.goToCallApi = goToCallApi;
            vm.getDiscoveryDocument = getDiscoveryDocument;

            function logout() {
                auth.logout();
            }

            function login() {
                auth.login('https://localhost:44333');
            }

            function loginWithGoogle() {
                auth.login('accounts.google.com');
            }

            function loginWithSalesForce() {
                auth.login('https://login.salesforce.com');
            }
            
            function getDiscoveryDocument()
            {
                console.log('call discovery');
                
                //vm.discoveryResult = discoveryDocumentService.method1();    
                
               /* $http.get('https://accounts.google.com/.well-known/openid-configuration').then(
                function(data){
                    console.log('response');
                    console.log(data);
                }).catch(function(data){
                    console.log('error');
                    console.log(data);
                });*/
                
                $http.get('https://accounts.google.com/.well-known/openid-configuration').then(
                function(data){
                    console.log('response');
                    console.log(data);
                }).catch(function(data){
                    console.log('error');
                    console.log(data);
                });
                
                
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

    app.controller('storageCtrl', [
        'storage',
        function (storage) {
            var vm = this;

            vm.items = {};

            init();

            function init() {
                vm.items = storage.items();
            }

    }]);
})();