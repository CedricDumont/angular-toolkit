(function () {
    'use strict';

    var module = angular.module('angular-toolkit-storage', []);

    /* defining services */

    module.factory('storage', ['$window', function ($window) {

        var prefix = 'at';

        var store = $window.localStorage;

        return {
            add: add,
            get: get,
            remove: remove,
            count: count,
            clear: clear
        };

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(buildKey(key), value);
        }

        function get(key) {
            var value = store.getItem(buildKey(key));

            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(buildKey(key));
        }

        function count() {
            return store.length;
        }

        function clear() {
            store.clear();
        }

        function buildKey(key) {
            return prefix + '-' + key;
        }

    }]);

})();