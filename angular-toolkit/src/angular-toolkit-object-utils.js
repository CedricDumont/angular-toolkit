(function () {
    'use strict';

    var module = angular.module('angular-toolkit-object-utils', []);

    /*defining Exceptions Objects */
    function ObjectException(message) {
        this.name = 'ObjectException';
        this.message = message;
    }

    ObjectException.prototype = new Error();
    ObjectException.prototype.constructor = ObjectException;

    /* defining services */

    module.factory('objectUtils', [function () {

        return {
            isPropertyDefined: isPropertyDefined,
            assertProperty : assertProperty
        };

        /*
         * @description Checks if an object contains a property (does not check on the parent chain)
         * @param {Object} obj the Object to check on.
         * @param {String} propertyName the name of the property.
         * @returns {boolean} true if the property is defined.
         */
        function isPropertyDefined(obj, propertyName) {
            return obj.hasOwnProperty(propertyName);
        }

               
        function assertProperty(obj, propertyName) {
           if(!isPropertyDefined(obj, propertyName))
           {
               throw new ObjectException(propertyName + ' is not defined on object : ' + obj);
           }
        }
        

    }]);

})();