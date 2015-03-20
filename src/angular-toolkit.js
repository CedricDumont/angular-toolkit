(function () {
    'use strict';

    var module = angular.module('angular-toolkit', [
        'angular-toolkit-auth',
        'angular-toolkit-notification'
    ]);

    module.config(['$provide', function ($provide) {

        $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {
                //console.log('exception');
                $delegate(exception, cause);

                var myNotifier = $injector.get('notifier');
                myNotifier.addError(exception.message);
            };
        }]);

        $provide.decorator('$interpolate', ['$delegate', '$log', function ($delegate, $log) {
            var serviceWrapper = function () {

                var bindingFunction = $delegate.apply(this, arguments);

                if (angular.isFunction(bindingFunction) && arguments[0]) {
                    return bindingWrapper(bindingFunction, arguments[0].trim());
                }

                return bindingFunction;
            };

            var bindingWrapper = function (bindingFunction, bindingExpression) {
                return function () {

                    var result = bindingFunction.apply(this, arguments);

                    var trimmedResult = result.trim();

                    var log = trimmedResult ? $log.info : $log.warn;

                    log.call($log, 'binding of  ' + bindingExpression + ' = ' + trimmedResult);

                    return result;
                };
            };


            angular.extend(serviceWrapper, $delegate);

            return serviceWrapper;
        }]);

    }]);

})();