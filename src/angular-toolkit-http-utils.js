(function () {
    'use strict';

    var module = angular.module('angular-toolkit-http-utils', []);
    //added for commit 2

    module.factory('httpUtils', [function () {

        return {
            formEncode: formEncode
        };

        function formEncode(data) {
            
            var str = [];
            
            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

    }]);

})();
