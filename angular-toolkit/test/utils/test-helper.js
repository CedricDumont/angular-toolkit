'use strict';

function URLHelper() {

    this.decodeURL = function (urlToDecode) {
        var search = urlToDecode;
        var result = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function (key, value) {
                return key === '' ? value : decodeURIComponent(value);
            }) : {};

        return result;

    };

}

if (typeof String.prototype.startsWith !== 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

}