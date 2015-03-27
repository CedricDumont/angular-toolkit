(function () {
    'use strict';

    var module = angular.module('angular-toolkit-http-utils', []);
    //added for commit 2

    module.factory('httpUtils', [function () {

        return {
            formEncode: formEncode,
            decodeURL: decodeURL
        };

        function formEncode(data) {

            var str = [];

            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

        function decodeURL(urlToDecode) {

            var obj = {};
            var pairs = urlToDecode.split('&');
            for (var i in pairs) {
                var split = pairs[i].split('=');
                obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
            }
            
            return obj;
            /*  var search = urlToDecode;
              var result = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                  function (key, value) {
                      var result = key === '' ? value : decodeURIComponent(value);
                      return result;
                  }) : {};

              return result;*/

        }

    }]);

})();