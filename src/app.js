(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'angular-toolkit'
    ]);

    app.controller('testCtrl', [function() {
        var vm = this;
        vm.message = 'angular-toolkit test app';
    }]);

})();
