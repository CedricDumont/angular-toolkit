(function () {
    'use strict';

    var module = angular.module('angular-toolkit-storage', []);

    /* defining services */

    module.factory('storage', ['$window',function ($window) {

        var prefix = 'at';
        var store = $window.localStorage;

        return {
            add: add,
            get : get,
            remode:remove
        };
        
        function add(key, value){
            value = angular.toJson(value);
            store.setItem(buildKey(key), value);
        }
        
        function get(key){
            var value = store.getItem(buildKey(key));
            
            if(value){
                value = angular.fromJson(value);
            }
            return value;
        }
        
        function remove(key){
            store.removeItem(key);
        }
        
        function buildKey(key)
        {
            return prefix + '-' + key;
        }

    }]);

})();