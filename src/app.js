(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'angular-toolkit'
    ]);

    app.controller('testCtrl', ['auth', function (auth) {
        var vm = this;
        vm.message = '';

        init();

        function init() {
            auth.login('testUser', 'testPwd').then(function (data) {
                vm.message = data;
            });
        }

    }]);

})();