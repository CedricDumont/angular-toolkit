(function () {
    'use strict';

    var module = angular.module('angular-toolkit', []);
    //added for commit 2
    
    module.factory('auth', ['$http', function($http) {
        
        return {
            login : login
        };
        
        function login(username, password) {
            
        }
        
    }]);    

})(); 
