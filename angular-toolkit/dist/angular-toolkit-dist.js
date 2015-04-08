(function () {
    'use strict';

    //module just to be called for wellknown openId providers
    var module = angular.module('angular-toolkit-auth-config', ['angular-toolkit-auth']);

    module.config(function (openIdProvider) {
        openIdProvider.config(TTOpenIdConfig);
        openIdProvider.config(googleOpenIdConfig);
        openIdProvider.config(salesForceOpenIdConfig);
    }); 

    var TTKeys = '{"keys":[{"kty":"RSA","use":"sig","kid":"a3rMUgMFv9tPclLa6yF3zAkfquE","x5t":"a3rMUgMFv9tPclLa6yF3zAkfquE","e":"AQAB","n":"qnTksBdxOiOlsmRNd-mMS2M3o1IDpK4uAr0T4_YqO3zYHAGAWTwsq4ms-NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4_O-0ILAlXw8NU4-jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj-x6daOv5FmrHU1r9_bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFw","x5c":["MIIDBTCCAfGgAwIBAgIQNQb+T2ncIrNA6cKvUA1GWTAJBgUrDgMCHQUAMBIxEDAOBgNVBAMTB0RldlJvb3QwHhcNMTAwMTIwMjIwMDAwWhcNMjAwMTIwMjIwMDAwWjAVMRMwEQYDVQQDEwppZHNydjN0ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqnTksBdxOiOlsmRNd+mMS2M3o1IDpK4uAr0T4/YqO3zYHAGAWTwsq4ms+NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4/O+0ILAlXw8NU4+jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj+x6daOv5FmrHU1r9/bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFwIDAQABo1wwWjATBgNVHSUEDDAKBggrBgEFBQcDATBDBgNVHQEEPDA6gBDSFgDaV+Q2d2191r6A38tBoRQwEjEQMA4GA1UEAxMHRGV2Um9vdIIQLFk7exPNg41NRNaeNu0I9jAJBgUrDgMCHQUAA4IBAQBUnMSZxY5xosMEW6Mz4WEAjNoNv2QvqNmk23RMZGMgr516ROeWS5D3RlTNyU8FkstNCC4maDM3E0Bi4bbzW3AwrpbluqtcyMN3Pivqdxx+zKWKiORJqqLIvN8CT1fVPxxXb/e9GOdaR8eXSmB0PgNUhM4IjgNkwBbvWC9F/lzvwjlQgciR7d4GfXPYsE1vf8tmdQaY8/PtdAkExmbrb9MihdggSoGXlELrPA91Yce+fiRcKY3rQlNWVd4DOoJ/cPXsXwry8pWjNCo5JD8Q+RQ5yZEy7YPoifwemLhTdsBz3hlZr28oCGJ3kbnpW0xGvQb3VHSTVVbeei0CfXoW6iz1"]}]}'; // jshint ignore:line


    var TTOpenIdConfig = {
        authority_endpoint: 'https://localhost:44333',
        keys: TTKeys
    };

    var googleKeys = '{keys:[{kty:"RSA",alg:"RS256",use:"sig",kid:"de95593a55348d6f43d999e8014ade3f20e54982",n:"7pWc6CbDP_DQ2slLRP3TAtJ9bJ2YxZHq1_GmvVUIM0y6uUckm39dk6Wkez5P5WwEH5XS5eUAuXG7l5Wb6lg6NCLq5-DoYErbA8tlNOe2wT4WkEASCamDyZr7U4bTkYuk3nXZtbpIY5gNt7V0PTZrdzpPrJrGSjiexk02lgMiOD8=",e:"AQAB"},{kty:"RSA",alg:"RS256",use:"sig",kid:"84a5738e82f54b59ac5b77c319ed91ca7157b464",n:"pHz0_grev1C6S3uYVEbxdYQgP0SEVkk-2qxaXFWWylpn15bAVb8Mbjno2faawQPvubWN4-JARNOMTHkrq7Y8mmlN6SPxlVRWxXvoLWQVSx1FndNv4JQ7xeoBIm9bTwnsmFHYU7uM1g6v23whTQPk6ruo9u-sW2NRpThR30pCEGE=",e:"AQAB"}]};'; // jshint ignore:line

    // Google openid config
    var googleOpenIdConfig = {
        issuer: 'accounts.google.com',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        token_endpoint: 'https://www.googleapis.com/oauth2/v3/token',
        userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        revocation_endpoint: 'https://accounts.google.com/o/oauth2/revoke',
        jwks_uri: 'https://www.googleapis.com/oauth2/v2/certs',
        redirect_uri: 'http://localhost:8000/demoApp/callback.html',
        keys: googleKeys
    };



    var salesforceKeys = '{"keys":[{"kty":"RSA","n":"wIQtK09qsu1qCCQu1mHh6d_EyyOlbqMCV8WMacOyhZng1sbaFJY-0PIH46Kw1uhjbHg94_r2UELYd30vF8xwViGhCmpPuSGhkxNoT5CMoJPS6JW-zBpR7suHqBUnaGdZ6G2uYZDpwWYs_4SJDuWzxVBrQqIM_ZVgUqutniQPmjMAX5MqznBTnG3zm728BmNzS7T2gtzxs3jAgDsSAu3Kxp3D6NDGERhaAJ8jOgwHvmQK5xFi9Adw7sv2nCH-wM-C5fLJYmpGOSrTP1HLOlq--TROAvWL9gcNEeq4arryIYux5syg66rHT8U2Uhb1PdXt7ReQY8wBnP2BBH1QH7rzOZ7UbqFLbQUQsZFAVMcfm7gJN8JWLlcSJZdC2zaY0wI5q8PWN-N_GgAK64FKZQ7pB0bRQ5AQx-D3U4sYE4EcgSvV8fW86PaF1VXaHMFcom48gZ1GzE_V25uPb-0yue0cv9lejrIKDvRiJ5UiyUPphro4Aw2ZcDi_8r8rqfglWhcnB4bGSri4kEBb_IdwvqKwRCqxlNdRnU1ooQeUBaVRwdbpj23Z1qtYjB55Wf2KOCJ6ewMyddq4bEAG6KIqPmssT7_exvygUyuW6qhnCV-gTZEwFI0A6djsHM5itfkzNY47BeuAtGXjuaRnVYIEvTrnSj3Lx7YfvCIiGqFrG6y31Ak","e":"AQAB","alg":"RS256","use":"sig","kid":"188"},{"kty":"RSA","n":"hsqiqMXZmxJHzWfZwbSffKfc9YYMxj83-aWhA91jtI8k-GMsEB6mtoNWLP6vmz6x6BQ8Sn6kmn65n1IGCIlWxhPn9yqfXBDBaHFGYED9bBloSEMFnnS9-ACsWrHl5UtDQ3nh-VQTKg1LBmjJMmAOHdBLoUikfpx8fjA1LfDn_1iNWnguj2ehgjWCuTn64UdUd84YNcfO8Ha0TAhWHOhkiluMyzGS0dtN0h8Ybyi5oL6Bf1sfhtOncUh1JuWMcmvICbGEkA_0vBbMp9nCvXdMlpzMOCIoYYkQ-25SRZ0GpIr_oBIZByEm1XaJIqNXoC7qJ95iAyWkUiSegY_IcBV3nMXr-kDNn9Vm2cgLEJGymOiDQKH8g7VjraCIrqWPD3DWv3Z6RsExs6i0gG3JU9cVVFwz87d05_yk3L5ubWb96uxsP9rkwZ3h8eJTfFrgMhk1ZwR-63Dk3ZLYisiAU0zKgr4vQ9qsCNPqDg0rkeqOY5k7Gy201_wh6Sw5dCNTTGmZZ1rNE-gyDu4-a1H40n8f2JFiH-xIOD9-w8HGYOu_oGlobK2KvzFYHTk-w7vtfhZ0j96UkjaBhVjYSMi4hf43xNbB4xJoHhHLESABLp9IYDlnzBeBXKumXDO5aRk3sFAEAWxj57Ec_DyK6UwXSR9Xqji5a1lEArUdFPYzVZ_YCec","e":"AQAB","alg":"RS256","use":"sig","kid":"194"},{"kty":"RSA","n":"5SGw1jcqyFYEZaf39RoxAhlq-hfRSOsneVtsT2k09yEQhwB2myvf3ckVAwFyBF6y0Hr1psvu1FlPzKQ9YfcQkfge4e7eeQ7uaez9mMQ8RpyAFZprq1iFCix4XQw-jKW47LAevr9w1ttZY932gFrGJ4gkf_uqutUny82vupVUETpQ6HDmIL958SxYb_-d436zi5LMlHnTxcR5TWIQGGxip-CrD7vOA3hrssYLhNGQdwVYtwI768EvwE8h4VJDgIrovoHPH1ofDQk8-oG20eEmZeWugI1K3z33fZJS-E_2p_OiDVr0EmgFMTvPTnQ75h_9vyF1qhzikJpN9P8KcEm8oGu7KJGIn8ggUY0ftqKG2KcWTaKiirFFYQ981PhLHryH18eOIxMpoh9pRXf2y7DfNTyid99ig0GUH-lzAlbKY0EV2sIuvEsIoo6G8YT2uI72xzl7sCcp41FS7oFwbUyHp_uHGiTZgN7g-18nm2TFmQ_wGB1xCwJMFzjIXq1PwEjmg3W5NBuMLSbG-aDwjeNrcD_4vfB6yg548GztQO2MpV_BuxtrZDJQm-xhJXdm4FfrJzWdwX_JN9qfsP0YU1_mxtSU_m6EKgmwFdE3Yh1WM0-kRRSk3gmNvXpiKeVduzm8I5_Jl7kwLgBw24QUVaLZn8jC2xWRk_jcBNFFLQgOf9U","e":"AQAB","alg":"RS256","use":"sig","kid":"196"},{"kty":"RSA","n":"o8Fz0jXjZ0Rz5Kt2TmzP0xVokf-Q4Az-MQg5i5MCxNNTQiZp7VkwAZeM0mJ-mKDbCzPm9ws43v8cxeiIkVZQqrAocnnb90MDCnU-7oD7MvOU4SbmhuLzVCyVZPIBRq5z0OgjcwLeD4trOoogkLOu0kyuyzNoFkr712m_GZ1xic-X0MlFKq3-2cI4U2nEuuh-Xcy7bUqCx0zTJFPOOKghGYEZZ6biZ04VC-ERcW6cC19pEWm6vCqZJEsKPCfazVAoHKZAukNd0XLPQd_W6xAaGnp8e7a5tFHn6dU6ikhI94ZieVp6WItWsQTDwJH-D7bVpVRG-lWL74lgcuQdFAtldm__k7FvlTXdqiLrd0rYuDnTFiwUSsUXWBJbmGVsEOylZVPQAL-K7G7p3BRY4X26vOgfludwCOj7L7WFbd0IXziTm74xe2KZGKsFpoCjJI0z_D5Oe5bofswr1Ceafhl97suG7OoInobt7QAQnnLcBVzUPz_TflOXDc5UiePptA0bxdd8MVENiDbTGGNz6DCzfL986QfcJLPB8aZa3lFN0kWPBkOclZagL4WpyIllB6euvZ2hfpt8IY2_bmUN06luo6N7Fy0hSSFMWvfzaD8_Ff3czb1Kv-b0xI6Ugk4d67RNNSbTcRM2Muvx-dJgOyXqrc_hE96OOqcMjrGZJoXnCAM","e":"AQAB","alg":"RS256","use":"sig","kid":"190"},{"kty":"RSA","n":"nOcQOvHV8rc-hcfP_RmxMGjyVlruSLeFXTojYcbixaAH36scUejjaws31orUjmYqB5isE9ntdsL4DnsdP_MDJ2mtYD2FIh8tBkJjgXitjdcDclrwELAx846wBIlSES8wR6czpdJZfSwhL_92EGpDH6z7lKEClqhDlbtZ-yFKFj9BQRwaEXWV7uuq23gxXOqyEN0WXl3ZJPgsodCnlXRn9y_r5CNV9V4wvzXGlJhT3Nv_N_Z5XNZIjZnHdCuE_itT4a1xENEEds7Jjg5mRTlVFzYv5iQtBo7jdY5ogMTgKPmRh6hYuqLeki3AOAUff1AGaN9TZH60UxwTw03-DQJL5C2SuC_vM5KIWxZxQniubfegUCBXpJSAJbLt8zSFztTcrLS4-wgUHo1A8TDNaO28_KsBUTWsrieOr3NfCn4bPNb7t8G90U60lW0GIhEda3fNYnV0WWpZVO1jCRNy_JYUs3ECo0E1ZQJZD72Dm6UjiuH7eR3ZgNKR9tlLNdyZSpZUZPErLrXJ90d5XbmJYvRX9r93z6GQqOv5FQy1JhatwefxhKdyhkDEHsqELO0XDqnDnmgxkEEU-lHYSVGz-iDlUZOUYTTCtxsPDmBIXOMuwp0UydJphO36qRQaDyEjHNsYKLj5KVvjDHS8Gw1FhbFvsoUrBHre4hLY9Pa5meatV_k","e":"AQAB","alg":"RS256","use":"sig","kid":"192"}]}'; // jshint ignore:line

    // salesforce openid config
    var salesForceOpenIdConfig = {
        issuer: 'https://login.salesforce.com',
        authorization_endpoint: 'https://login.salesforce.com/services/oauth2/authorize',
        token_endpoint: 'https://login.salesforce.com/services/oauth2/token',
        userinfo_endpoint: 'https://login.salesforce.com/services/oauth2/userinfo',
        revocation_endpoint: 'https://login.salesforce.com/services/oauth2/revoke',
        jwks_uri: 'https://login.salesforce.com/id/keys',
        redirect_uri: 'http://localhost:8000/demoApp/callback.html',
        keys: salesforceKeys
    };




})();
(function () {
    'use strict';

    var OPENID_CONFIGURATION_ENDPOINT = '/.well-known/openid-configuration';

    var REDIRECTING_URI = '/openid-redirect/';

    var LOGOUT_REDIRERCT_URI = '/openid-logout/';

    //defining the module
    var module = angular.module('angular-toolkit-auth', [
        'ngRoute',
        'angular-toolkit-http-utils',
        'angular-toolkit-object-utils',
        'angular-toolkit-storage',
        'angular-toolkit-notification',
        'angular-toolkit-random'
    ]);

    module.run(function ($templateCache) {
        $templateCache.put('callback.html', '<div ng-controller="atOpenIdCallbackCtrl as vm">{{vm.message}}</div>');
    });

    module.config(['$routeProvider',
      function ($routeProvider) {
            $routeProvider.
            when(REDIRECTING_URI + ':token', {
                templateUrl: 'callback.html'
            });
    }]);

    /*
     * TODO :  I should rewrite to be able to use outside of angular context?
     */
    function OpenIdConfiguration(config, $location) {

        var baseRef = config.baseAppRef;

        var discoveryFile = config.discoveryFile;

        var clientId = config.clientId;

        var store = config.store;

        var redirect_uri = config.redirect_uri;

        angular.extend(this, discoveryFile);

        this.currentAccessToken = undefined;

        this.isScopeSupported = function (scope) {
            var result = false;

            this.scopes_supported.every(function (supportedScope) {
                if (supportedScope === scope) {
                    result = true;
                    return;
                }
            });

            return result;
        };

        this.createRootUrl = function () {

            if (this.redirect_uri) {
                return this.redirect_uri;
            }
            var rootUrl = $location.protocol();

            rootUrl += '://';

            rootUrl += $location.host();

            rootUrl += ':' + $location.port();

            rootUrl += '/';

            rootUrl += baseRef;

            rootUrl += '#';

            rootUrl += REDIRECTING_URI;

            return rootUrl;
        };

        this.generateAuthorizeUrl = function (returnAsObject) {

            //generate states and nonce
            var generatedState = randomString();
            var generatedNonce = randomString();

            //save state and nonce for later checks
            saveState(generatedState);
            saveNonce(generatedNonce);

            var data = {
                client_id: clientId,
                response_type: 'id_token token',
                redirect_uri: this.createRootUrl(),
                scope: 'openid profile',
                state: generatedState,
                nonce: generatedNonce
            };

            var authorizeUrl = {
                data: data,
                url: this.authorization_endpoint,
                get value() {
                    return this.url + '?' + formEncode(this.data);
                }
            };

            if (returnAsObject) {
                return authorizeUrl;
            } else {
                return authorizeUrl.value;
            }
        };

        this.generateLogoutUrl = function (id_token, returnAsObject) {
            if (!this.end_session_endpoint) {
                throw new AuthException('No end_session_endpoint defined in the discovery document');
            }

            var logoutUrl = {
                data: {
                    id_token_hint: id_token,
                    post_logout_redirect_uri: 'http://localhost:8000/demoApp/index.html/'
                },
                url: this.end_session_endpoint,
                get value() {
                    return this.url + '?' + formEncode(this.data);
                }
            };

            //console.log(logoutUrl);

            if (returnAsObject) {
                return logoutUrl;
            } else {
                return logoutUrl.value;
            }

        };

        this.challengeState = function (state) {
            var currentState = store.get(clientId + '-state');

            if (currentState === state) {
                return true;
            }

            return false;
        };

        function saveState(state) {
            store.add(clientId + '-state', state);
        }

        this.challengeNonce = function (nonce) {
            var currentNonce = store.get(clientId + '-nonce');

            if (currentNonce === nonce) {
                return true;
            }

            return false;
        };

        function saveNonce(nonce) {
            store.add(clientId + '-nonce', nonce);
        }

        function formEncode(data) {

            var str = [];

            for (var name in data) {
                str.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            return str.join('&').replace(/%20/g, '+');
        }

        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }

        function randomString() {
            /* jshint -W016 */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            var result = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

            return result;
            /* jshint +W016 */
        }

    }


    //defining Exceptions Objects 
    function AuthException(message) {
        this.name = 'LoginException';
        this.message = message;
    }

    AuthException.prototype = new Error();
    AuthException.prototype.constructor = AuthException;

    //configure the module
    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('requestAuthenticator');
        $httpProvider.interceptors.push('loginRedirect');

    }]);

    module.controller('atOpenIdCallbackCtrl', ['auth',
                            function (auth) {

            var vm = this;

            auth.handleResponse();

    }]);

    module.factory('idTokenValidator', ['$http', 'openId', function ($http, openId) {
        return {
            validate: validate,
            getCert: getCert
        };

        function validate(token) {
            var parts = token.split('.');

            var tokenHeader = JSON.parse(atob(parts[0]));
            var tokenBody = JSON.parse(atob(parts[1]));

            var certObject = getCert(tokenBody.iss);

            //var certificates = certObject.keys[0].x5c[0];           

            return tokenBody;
        }

        function getCert(issuer) {
            var certificates = openId.getConfiguration(issuer).certs;
            return certificates;
        }

    }]);


    module.provider('auth', function () {
        var authenticationTypes = ['Bearer']; // could be 'Basic', 'Cookies' ..
        var _authenticationType = '';
        var _postLoginRedirection;

        this.setAuthenticationType = function (authType) {
            _authenticationType = authType;
        };

        this.setPostLoginRedirection = function (postLoginRedirection) {
            _postLoginRedirection = postLoginRedirection;
        };

        this.$get = ['$http', '$location', 'loginRedirect', 'principal', 'notifier', '$window',
                     'openId', 'httpUtils', 'idTokenValidator',
                        function ($http, $location, loginRedirect, principal, notifier, $window,
                openId, httpUtils, idTokenValidator) {

                //Configure the auth type
                principal.setAuthenticationType(_authenticationType);

                var lastLoginPath;

                return {
                    login: login,
                    logout: logout,
                    handleResponse: handleResponse
                };

                function logout() {
                    principal.setProfile('', '', '');
                    httpUtils.redirectBrowserTo(
                        openId.getConfiguration().generateLogoutUrl(principal.identity.id_token));
                }

                function login(providerName, username, password) {

                    console.log(openId.getConfiguration(providerName));

                    lastLoginPath = $window.location.href;

                    httpUtils.redirectBrowserTo(openId.getConfiguration(providerName).generateAuthorizeUrl());

                }

                function handleResponse() {

                    var responseHandlingInfo = {
                        isOpenId: false,

                    };

                    var browserUrl = $location.absUrl();

                    //check if it's an openid response                    
                    var isOpenId = openId.isOpenIdCallback(browserUrl);

                    if (isOpenId) {

                        responseHandlingInfo.isOpenId = true;

                        var idx = browserUrl.lastIndexOf('#');

                        if (idx >= 0) {
                            var queryString = browserUrl.substr(idx + 1);

                            //remove leading '/' if there is one.
                            if (queryString.startsWith('/')) {
                                queryString = queryString.substr(1);
                            }

                            var decodedResponse = httpUtils.decodeURL(queryString);

                            var token_contents = idTokenValidator.validate(decodedResponse.id_token);

                            principal.setProfile('Anonymous', decodedResponse.access_token, decodedResponse.id_token);

                            _postLoginRedirection = _postLoginRedirection || lastLoginPath;

                            if (openId.getConfiguration(token_contents.iss).userinfo_endpoint) {

                                $http.get(openId.getConfiguration(token_contents.iss).userinfo_endpoint)
                                    .then(function (data) {
                                        httpUtils.redirectBrowserTo(_postLoginRedirection);
                                        principal.setProfile(data.data.name,
                                            decodedResponse.access_token,
                                            decodedResponse.id_token);

                                    }).then()
                                    .catch(function (data) {
                                        console.log('error');
                                        console.log(data);
                                    });
                            }

                            //console.log(decodedResponse.access_token);




                        }
                    } else {
                        throw new Error('Auth scheme not currently supported for :' + browserUrl);
                    }

                    return responseHandlingInfo;
                }

            }];
    });

    module.provider('principal', function () {

        this.$get = ['storage', 'notifier', function (storage, notifier) {

            var IDENTITY_KEY = 'Identity';

            var identity = initialize();

            var authenticationInfo = [];

            return {
                identity: identity,
                setProfile: setProfile,
                setAuthenticationType: setAuthenticationType,
                remove: remove
            };

            function remove() {
                notifier.addDebug('remove principal');
                storage.remove(IDENTITY_KEY);
                identity = initialize();
            }

            function setAuthenticationType(authType) {
                identity.authenticationType = authType;
            }


            function initialize() {
                var identity = {
                    name: '',
                    token: '',
                    id_token: '',
                    authenticationType: 'None',
                    get isAuthenticated() {
                        if (this.token) {
                            return true;
                        }
                        return false;
                    }
                };

                var localIdentity = storage.get(IDENTITY_KEY);

                if (localIdentity) {
                    notifier.addDebug('fill from localstorage');
                    identity.name = localIdentity.name;
                    identity.authenticationType = localIdentity.authenticationType;
                    identity.token = localIdentity.token;
                    identity.id_token = localIdentity.id_token;
                }

                return identity;

            }

            function setProfile(username, access_token, id_token) {
                identity.name = username;
                identity.token = access_token;
                identity.id_token = id_token;
                notifier.addDebug('add profile to storage');
                storage.add(IDENTITY_KEY, identity);
            }

        }];
    });


    module.provider('openId', function () {

        var _config = {};

        this.config = function (configuration) {

            if (configuration.authority_endpoint) {
                _config[configuration.authority_endpoint] = configuration;
            } else {
                _config[configuration.issuer] = configuration;
            }

        };

        var _baseAppRef = '';

        this.setBaseAppRef = function (baseAppRef) {
            _baseAppRef = baseAppRef;
        };

        this.$get = ['$rootScope', '$http', '$q', 'storage', '$location',
                     function ($rootScope, $http, $q, storage, $location) {

                var initializePromise;

                var isInitialized = false;

                initialize();

                return {
                    authorityEndpoint: _config.authority_endpoint,
                    getConfiguration: getConfiguration,
                    initialize: initialize,
                    getConfig: getConfig,
                    isOpenIdCallback: isOpenIdCallback
                };

                function isOpenIdCallback(url) {
                    if (url.contains('id_token')) {
                        return true;
                    }
                    return false;
                }

                function getConfig(issuer) {
                    return _config[issuer];
                }

                function initialize() {

                    for (var key in _config) {

                        var currentConfig = getConfig(key);

                        if (currentConfig.authority_endpoint) {
                            var tempKey = key;
                            var discoveryEndpoint = currentConfig.authority_endpoint + OPENID_CONFIGURATION_ENDPOINT;
                            initializePromise = $http.get(discoveryEndpoint).then(function (data) {
                                var resultc = {
                                    name: tempKey,
                                    data: data.data
                                };

                                return resultc;
                            }).then(success1).catch(error);
                        } else {
                            var tempKey2 = key;

                            var deffered = $q.defer();

                            var result2 = {
                                name: tempKey2,
                                data: currentConfig
                            };

                            deffered.resolve(result2);

                            deffered.promise.then(success2).catch(error);

                        }

                    }

                    //this is not the good place : must be thrown after all promise are resolved
                    // use $q.whenAll to report initalization status to help debugging
                    $rootScope.$broadcast('AT-READY');

                    function success2(result2) {

                        var jwks_uri = result2.data.jwks_uri;

                        $http.get(jwks_uri).then(function (data) {

                            var configuration = {};

                            configuration.data = result2.data;
                            configuration.certs = data.data;

                            storage.add(result2.name + '-configuration', configuration);

                            isInitialized = true;

                        }).catch(function (data, status, headers, config) {
                            var configuration = {};

                            configuration.data = result2.data;

                            console.log('using preconfigured keys instead for ' + result2.name);

                            // at least check if keys were configured and use them in place
                            if (result2.data.keys) {

                                console.log('using preconfigured keys instead for ' + result2.name);

                                configuration.certs = result2.data.keys;
                            }
                            storage.add(result2.name + '-configuration', configuration);
                        });

                    }

                    function success1(result1) {

                        /*console.log('saving result1');
                        console.log(result1);*/
                        //load certificates
                        //console.log(result.data.jwks_uri);
                        var jwks_uri = result1.data.jwks_uri;

                        $http.get(jwks_uri).then(function (data) {

                            var configuration = {};

                            configuration.data = result1.data;
                            configuration.certs = data.data;

                            storage.add(result1.name + '-configuration', configuration);

                            isInitialized = true;

                        });

                    }

                    function error(data) {
                        var _configuration = null;
                        isInitialized = false;
                        console.log('could not initialize provider ' + data);
                    }
                }

                function getConfiguration(configName) {

                    var result = storage.get(configName + '-configuration');

                    var config = {
                        discoveryFile: result.data,
                        store: storage,
                        baseAppRef: _baseAppRef,
                        //clientId: '3MVG9A_f29uWoVQsOJ33xZnEcrNSg0uWCIbXeiTXTwMleZuYoekI6B.XgKJ3bJ1PPAib9TLX.EYfC004ZUBvw' // jshint ignore:line
                            //clientId: '116616979000-bu0mthqdsfqe7pn794eamhucf4gvc1t6.apps.googleusercontent.com'
                            clientId: 'implicitclient'
                    };

                    config.discoveryFile.certs = result.certs;

                    var opeidconfig = new OpenIdConfiguration(config, $location);

                    return opeidconfig;
                }

        }];
    });

    module.factory('requestAuthenticator', ['$q', 'principal', function ($q, principal) {
        return {
            request: request,
            response: response
        };

        function request(config) {
            if (principal.identity.isAuthenticated) {
                //console.log('add token : ' + principal.identity.token);
                config.headers.Authorization = 'Bearer ' + principal.identity.token;
            }
            return $q.when(config);
        }

        function response(resp) {
            return $q.when(resp);
        }

    }]);

    module.factory('loginRedirect', ['$q', '$location', function ($q, $location) {
        var lastPath = '/';
        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin
        };

        function responseError(response) {
            if (response.status === 401) {
                lastPath = $location.path();
                $location.path('/login');
            }
            return $q.reject(response);

        }

        function redirectPostLogin() {
            $location.path(lastPath);
            lastPath = '/';
        }

    }]);

    module.directive('atPrincipal', ['principal', function (principal) {

        return {
            restrict: 'E',
            template: 'principal is logged f in {{loggedIn}}',
            scope: {},
            link: function (scope, element, attrs) {
                scope.loggedIn = principal.identity.isAuthenticated;
            }
        };

    }]);

    module.directive('atReady', ['principal', function (principal) {

        return {
            restrict: 'AE',
            template: 'aithentication toolkit is ready :  {{atReady}}',
            link: function (scope, element, attrs) {

                scope.atReady = false;

                scope.$on('AT-READY', function () {
                    scope.atReady = true;
                });

            }
        };

    }]);






})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-http-utils', []);
    //added for commit 2

    module.factory('httpUtils', ['$window', function ($window) {

        return {
            formEncode: formEncode,
            decodeURL: decodeURL,
            redirectBrowserTo : redirectBrowserTo
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
        
        function redirectBrowserTo(url)
        {
            $window.location.href = url;
        }

    }]);

})();
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-notification', []);

    /* defining services */

    module.factory('notifier', ['$timeout', function ($timeout) {

        var currentNotifications = [];
        var notificationTypes = ['info', 'success', 'error','warning'];
        var timeout = 5000;

        return {
            notifications: currentNotifications,
            notificationTypes: notificationTypes,
            addWarning: addWarning,
            addError: addError,
            addInfo: addInfo,
            addDebug : addDebug,
            addSuccess: addSuccess,
            remove : remove,
            getErrorHandler : getErrorHandler
        };
        
        function remove(notification){
            for (var i=0;i < currentNotifications.length;i++){
                if(currentNotifications[i] === notification){
                    currentNotifications.splice(i,1);
                }
            }
        }
        
        function getErrorHandler(description)
        {
            return function(){
                addError(description);
            };
        }

        function addWarning(message) {
            add('warning', message);
        }

        function addError(message) {
            add('error', message);
        }

        function addInfo(message) {
            add('info', message);
        }
        
        function addDebug(message) {
            add('debug', message);
        }

        function addSuccess(message) {
            add('success', message);
        }

        function add(type, message) {
            var notification = { type: type,message: message};
            
            currentNotifications.push(notification);
            
            $timeout(function(){
                remove(notification);                
            }, timeout);
            
            
        }
    }]);

    module.directive('atNotifications', ['notifier', function (notifier) {
        return {
            restrict: 'AE',
            scope: {},
            template: '<div ng-repeat="notification in notifications">' + 
                        '{{notification.type}} - {{notification.message}}</div>',
            link: function (scope) {
                scope.notifications = notifier.notifications;
            }

        };

    }]);

})();
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
(function () {
    'use strict';

    var module = angular.module('angular-toolkit-random', []);
    // credit of this goes to : http://jsperf.com/uuid-generator-opt/4

    module.factory('UUID', [function () {

        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }

        return {
            newUUID: newUUID
        };

        
        function newUUID() {
            /* jshint -W016 */
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            var result = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];

            return result;
            /* jshint +W016 */
        }

    }]);

})();
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
            clear: clear,
            items: items
        };

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(buildKey(key), value);
        }
        
        

        function items() {
            var result = [];

            for (var key in store) {
                result.push({
                    key: key,
                    value: store[key]
                });
            }

            return result;

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
///#source 1 1 crypto.min.js
var CryptoJS=CryptoJS||function(n,t){var u={},f=u.lib={},i=f.Base=function(){function n(){}return{extend:function(t){n.prototype=this;var i=new n;return t&&i.mixIn(t),i.hasOwnProperty("init")||(i.init=function(){i.$super.init.apply(this,arguments)}),i.init.prototype=i,i.$super=this,i},create:function(){var n=this.extend();return n.init.apply(n,arguments),n},init:function(){},mixIn:function(n){for(var t in n)n.hasOwnProperty(t)&&(this[t]=n[t]);n.hasOwnProperty("toString")&&(this.toString=n.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),r=f.WordArray=i.extend({init:function(n,i){n=this.words=n||[];this.sigBytes=i!=t?i:n.length*4},toString:function(n){return(n||h).stringify(this)},concat:function(n){var i=this.words,r=n.words,u=this.sigBytes,f=n.sigBytes,e,t;if(this.clamp(),u%4)for(t=0;t<f;t++)e=r[t>>>2]>>>24-t%4*8&255,i[u+t>>>2]|=e<<24-(u+t)%4*8;else if(r.length>65535)for(t=0;t<f;t+=4)i[u+t>>>2]=r[t>>>2];else i.push.apply(i,r);return this.sigBytes+=f,this},clamp:function(){var i=this.words,t=this.sigBytes;i[t>>>2]&=4294967295<<32-t%4*8;i.length=n.ceil(t/4)},clone:function(){var n=i.clone.call(this);return n.words=this.words.slice(0),n},random:function(t){for(var i=[],u=0;u<t;u+=4)i.push(n.random()*4294967296|0);return new r.init(i,t)}}),e=u.enc={},h=e.Hex={stringify:function(n){for(var r,u=n.words,f=n.sigBytes,i=[],t=0;t<f;t++)r=u[t>>>2]>>>24-t%4*8&255,i.push((r>>>4).toString(16)),i.push((r&15).toString(16));return i.join("")},parse:function(n){for(var i=n.length,u=[],t=0;t<i;t+=2)u[t>>>3]|=parseInt(n.substr(t,2),16)<<24-t%8*4;return new r.init(u,i/2)}},o=e.Latin1={stringify:function(n){for(var r,u=n.words,f=n.sigBytes,i=[],t=0;t<f;t++)r=u[t>>>2]>>>24-t%4*8&255,i.push(String.fromCharCode(r));return i.join("")},parse:function(n){for(var i=n.length,u=[],t=0;t<i;t++)u[t>>>2]|=(n.charCodeAt(t)&255)<<24-t%4*8;return new r.init(u,i)}},c=e.Utf8={stringify:function(n){try{return decodeURIComponent(escape(o.stringify(n)))}catch(t){throw new Error("Malformed UTF-8 data");}},parse:function(n){return o.parse(unescape(encodeURIComponent(n)))}},s=f.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(n){typeof n=="string"&&(n=c.parse(n));this._data.concat(n);this._nDataBytes+=n.sigBytes},_process:function(t){var e=this._data,h=e.words,c=e.sigBytes,o=this.blockSize,a=o*4,u=c/a,i,s,f,l;if(u=t?n.ceil(u):n.max((u|0)-this._minBufferSize,0),i=u*o,s=n.min(i*4,c),i){for(f=0;f<i;f+=o)this._doProcessBlock(h,f);l=h.splice(0,i);e.sigBytes-=s}return new r.init(l,s)},clone:function(){var n=i.clone.call(this);return n._data=this._data.clone(),n},_minBufferSize:0}),a=f.Hasher=s.extend({cfg:i.extend(),init:function(n){this.cfg=this.cfg.extend(n);this.reset()},reset:function(){s.reset.call(this);this._doReset()},update:function(n){return this._append(n),this._process(),this},finalize:function(n){n&&this._append(n);return this._doFinalize()},blockSize:16,_createHelper:function(n){return function(t,i){return new n.init(i).finalize(t)}},_createHmacHelper:function(n){return function(t,i){return new l.HMAC.init(n,i).finalize(t)}}}),l=u.algo={};return u}(Math);(function(){var t=CryptoJS,r=t.lib,f=r.WordArray,i=r.Hasher,e=t.algo,n=[],u=e.SHA1=i.extend({_doReset:function(){this._hash=new f.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,i){for(var c,l,r=this._hash.words,s=r[0],f=r[1],e=r[2],o=r[3],h=r[4],u=0;u<80;u++)u<16?n[u]=t[i+u]|0:(c=n[u-3]^n[u-8]^n[u-14]^n[u-16],n[u]=c<<1|c>>>31),l=(s<<5|s>>>27)+h+n[u],l+=u<20?(f&e|~f&o)+1518500249:u<40?(f^e^o)+1859775393:u<60?(f&e|f&o|e&o)-1894007588:(f^e^o)-899497514,h=o,o=e,e=f<<30|f>>>2,f=s,s=l;r[0]=r[0]+s|0;r[1]=r[1]+f|0;r[2]=r[2]+e|0;r[3]=r[3]+o|0;r[4]=r[4]+h|0},_doFinalize:function(){var i=this._data,n=i.words,r=this._nDataBytes*8,t=i.sigBytes*8;return n[t>>>5]|=128<<24-t%32,n[(t+64>>>9<<4)+14]=Math.floor(r/4294967296),n[(t+64>>>9<<4)+15]=r,i.sigBytes=n.length*4,this._process(),this._hash},clone:function(){var n=i.clone.call(this);return n._hash=this._hash.clone(),n}});t.SHA1=i._createHelper(u);t.HmacSHA1=i._createHmacHelper(u)})(),function(n){var i=CryptoJS,f=i.lib,s=f.WordArray,r=f.Hasher,h=i.algo,e=[],o=[],t,u;(function(){function u(t){for(var r=n.sqrt(t),i=2;i<=r;i++)if(!(t%i))return!1;return!0}function r(n){return(n-(n|0))*4294967296|0}for(var i=2,t=0;t<64;)u(i)&&(t<8&&(e[t]=r(n.pow(i,1/2))),o[t]=r(n.pow(i,1/3)),t++),i++})();t=[];u=h.SHA256=r.extend({_doReset:function(){this._hash=new s.init(e.slice(0))},_doProcessBlock:function(n,i){for(var r=this._hash.words,f=r[0],s=r[1],h=r[2],y=r[3],e=r[4],a=r[5],v=r[6],p=r[7],u=0;u<64;u++){if(u<16)t[u]=n[i+u]|0;else{var c=t[u-15],b=(c<<25|c>>>7)^(c<<14|c>>>18)^c>>>3,l=t[u-2],k=(l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10;t[u]=b+t[u-7]+k+t[u-16]}var d=e&a^~e&v,g=f&s^f&h^s&h,nt=(f<<30|f>>>2)^(f<<19|f>>>13)^(f<<10|f>>>22),tt=(e<<26|e>>>6)^(e<<21|e>>>11)^(e<<7|e>>>25),w=p+tt+d+o[u]+t[u],it=nt+g;p=v;v=a;a=e;e=y+w|0;y=h;h=s;s=f;f=w+it|0}r[0]=r[0]+f|0;r[1]=r[1]+s|0;r[2]=r[2]+h|0;r[3]=r[3]+y|0;r[4]=r[4]+e|0;r[5]=r[5]+a|0;r[6]=r[6]+v|0;r[7]=r[7]+p|0},_doFinalize:function(){var r=this._data,t=r.words,u=this._nDataBytes*8,i=r.sigBytes*8;return t[i>>>5]|=128<<24-i%32,t[(i+64>>>9<<4)+14]=n.floor(u/4294967296),t[(i+64>>>9<<4)+15]=u,r.sigBytes=t.length*4,this._process(),this._hash},clone:function(){var n=r.clone.call(this);return n._hash=this._hash.clone(),n}});i.SHA256=r._createHelper(u);i.HmacSHA256=r._createHmacHelper(u)}(Math),function(n){var i=CryptoJS,r=i.lib,t=r.Base,f=r.WordArray,u=i.x64={},e=u.Word=t.extend({init:function(n,t){this.high=n;this.low=t}}),o=u.WordArray=t.extend({init:function(t,i){t=this.words=t||[];this.sigBytes=i!=n?i:t.length*8},toX32:function(){for(var i,r=this.words,u=r.length,n=[],t=0;t<u;t++)i=r[t],n.push(i.high),n.push(i.low);return f.create(n,this.sigBytes)},clone:function(){for(var r=t.clone.call(this),i=r.words=this.words.slice(0),u=i.length,n=0;n<u;n++)i[n]=i[n].clone();return r}})}(),function(){function n(){return t.create.apply(t,arguments)}var r=CryptoJS,o=r.lib,u=o.Hasher,e=r.x64,t=e.Word,s=e.WordArray,h=r.algo,c=[n(1116352408,3609767458),n(1899447441,602891725),n(3049323471,3964484399),n(3921009573,2173295548),n(961987163,4081628472),n(1508970993,3053834265),n(2453635748,2937671579),n(2870763221,3664609560),n(3624381080,2734883394),n(310598401,1164996542),n(607225278,1323610764),n(1426881987,3590304994),n(1925078388,4068182383),n(2162078206,991336113),n(2614888103,633803317),n(3248222580,3479774868),n(3835390401,2666613458),n(4022224774,944711139),n(264347078,2341262773),n(604807628,2007800933),n(770255983,1495990901),n(1249150122,1856431235),n(1555081692,3175218132),n(1996064986,2198950837),n(2554220882,3999719339),n(2821834349,766784016),n(2952996808,2566594879),n(3210313671,3203337956),n(3336571891,1034457026),n(3584528711,2466948901),n(113926993,3758326383),n(338241895,168717936),n(666307205,1188179964),n(773529912,1546045734),n(1294757372,1522805485),n(1396182291,2643833823),n(1695183700,2343527390),n(1986661051,1014477480),n(2177026350,1206759142),n(2456956037,344077627),n(2730485921,1290863460),n(2820302411,3158454273),n(3259730800,3505952657),n(3345764771,106217008),n(3516065817,3606008344),n(3600352804,1432725776),n(4094571909,1467031594),n(275423344,851169720),n(430227734,3100823752),n(506948616,1363258195),n(659060556,3750685593),n(883997877,3785050280),n(958139571,3318307427),n(1322822218,3812723403),n(1537002063,2003034995),n(1747873779,3602036899),n(1955562222,1575990012),n(2024104815,1125592928),n(2227730452,2716904306),n(2361852424,442776044),n(2428436474,593698344),n(2756734187,3733110249),n(3204031479,2999351573),n(3329325298,3815920427),n(3391569614,3928383900),n(3515267271,566280711),n(3940187606,3454069534),n(4118630271,4000239992),n(116418474,1914138554),n(174292421,2731055270),n(289380356,3203993006),n(460393269,320620315),n(685471733,587496836),n(852142971,1086792851),n(1017036298,365543100),n(1126000580,2618297676),n(1288033470,3409855158),n(1501505948,4234509866),n(1607167915,987167468),n(1816402316,1246189591)],i=[],f;(function(){for(var t=0;t<80;t++)i[t]=n()})();f=h.SHA512=u.extend({_doReset:function(){this._hash=new s.init([new t.init(1779033703,4089235720),new t.init(3144134277,2227873595),new t.init(1013904242,4271175723),new t.init(2773480762,1595750129),new t.init(1359893119,2917565137),new t.init(2600822924,725511199),new t.init(528734635,4215389547),new t.init(1541459225,327033209)])},_doProcessBlock:function(n,t){for(var tt,it,h,l=this._hash.words,et=l[0],ot=l[1],st=l[2],ht=l[3],ct=l[4],lt=l[5],at=l[6],vt=l[7],fi=et.high,yt=et.low,ei=ot.high,pt=ot.low,oi=st.high,wt=st.low,si=ht.high,bt=ht.low,hi=ct.high,kt=ct.low,ci=lt.high,dt=lt.low,li=at.high,gt=at.low,ai=vt.high,ni=vt.low,f=fi,r=yt,w=ei,a=pt,b=oi,v=wt,ri=si,k=bt,e=hi,u=kt,ti=ci,d=dt,ii=li,g=gt,ui=ai,nt=ni,o=0;o<80;o++){if(tt=i[o],o<16)it=tt.high=n[t+o*2]|0,h=tt.low=n[t+o*2+1]|0;else{var vi=i[o-15],y=vi.high,rt=vi.low,ur=(y>>>1|rt<<31)^(y>>>8|rt<<24)^y>>>7,yi=(rt>>>1|y<<31)^(rt>>>8|y<<24)^(rt>>>7|y<<25),pi=i[o-2],p=pi.high,ut=pi.low,fr=(p>>>19|ut<<13)^(p<<3|ut>>>29)^p>>>6,wi=(ut>>>19|p<<13)^(ut<<3|p>>>29)^(ut>>>6|p<<26),bi=i[o-7],er=bi.high,or=bi.low,ki=i[o-16],sr=ki.high,di=ki.low,h=yi+or,it=ur+er+(h>>>0<yi>>>0?1:0),h=h+wi,it=it+fr+(h>>>0<wi>>>0?1:0),h=h+di,it=it+sr+(h>>>0<di>>>0?1:0);tt.high=it;tt.low=h}var hr=e&ti^~e&ii,gi=u&d^~u&g,cr=f&w^f&b^w&b,lr=r&a^r&v^a&v,ar=(f>>>28|r<<4)^(f<<30|r>>>2)^(f<<25|r>>>7),nr=(r>>>28|f<<4)^(r<<30|f>>>2)^(r<<25|f>>>7),vr=(e>>>14|u<<18)^(e>>>18|u<<14)^(e<<23|u>>>9),yr=(u>>>14|e<<18)^(u>>>18|e<<14)^(u<<23|e>>>9),tr=c[o],pr=tr.high,ir=tr.low,s=nt+yr,ft=ui+vr+(s>>>0<nt>>>0?1:0),s=s+gi,ft=ft+hr+(s>>>0<gi>>>0?1:0),s=s+ir,ft=ft+pr+(s>>>0<ir>>>0?1:0),s=s+h,ft=ft+it+(s>>>0<h>>>0?1:0),rr=nr+lr,wr=ar+cr+(rr>>>0<nr>>>0?1:0);ui=ii;nt=g;ii=ti;g=d;ti=e;d=u;u=k+s|0;e=ri+ft+(u>>>0<k>>>0?1:0)|0;ri=b;k=v;b=w;v=a;w=f;a=r;r=s+rr|0;f=ft+wr+(r>>>0<s>>>0?1:0)|0}yt=et.low=yt+r;et.high=fi+f+(yt>>>0<r>>>0?1:0);pt=ot.low=pt+a;ot.high=ei+w+(pt>>>0<a>>>0?1:0);wt=st.low=wt+v;st.high=oi+b+(wt>>>0<v>>>0?1:0);bt=ht.low=bt+k;ht.high=si+ri+(bt>>>0<k>>>0?1:0);kt=ct.low=kt+u;ct.high=hi+e+(kt>>>0<u>>>0?1:0);dt=lt.low=dt+d;lt.high=ci+ti+(dt>>>0<d>>>0?1:0);gt=at.low=gt+g;at.high=li+ii+(gt>>>0<g>>>0?1:0);ni=vt.low=ni+nt;vt.high=ai+ui+(ni>>>0<nt>>>0?1:0)},_doFinalize:function(){var i=this._data,n=i.words,r=this._nDataBytes*8,t=i.sigBytes*8;return n[t>>>5]|=128<<24-t%32,n[(t+128>>>10<<5)+30]=Math.floor(r/4294967296),n[(t+128>>>10<<5)+31]=r,i.sigBytes=n.length*4,this._process(),this._hash.toX32()},clone:function(){var n=u.clone.call(this);return n._hash=this._hash.clone(),n},blockSize:32});r.SHA512=u._createHelper(f);r.HmacSHA512=u._createHmacHelper(f)}();
///#source 1 1 rsa.min.js
function hex2b64(n){for(var i,r="",t=0;t+3<=n.length;t+=3)i=parseInt(n.substring(t,t+3),16),r+=b64map.charAt(i>>6)+b64map.charAt(i&63);if(t+1==n.length?(i=parseInt(n.substring(t,t+1),16),r+=b64map.charAt(i<<2)):t+2==n.length&&(i=parseInt(n.substring(t,t+2),16),r+=b64map.charAt(i>>2)+b64map.charAt((i&3)<<4)),b64pad)while((r.length&3)>0)r+=b64pad;return r}function b64tohex(n){for(var i="",r=0,u,t,f=0;f<n.length;++f){if(n.charAt(f)==b64pad)break;(t=b64map.indexOf(n.charAt(f)),t<0)||(r==0?(i+=int2char(t>>2),u=t&3,r=1):r==1?(i+=int2char(u<<2|t>>4),u=t&15,r=2):r==2?(i+=int2char(u),i+=int2char(t>>2),u=t&3,r=3):(i+=int2char(u<<2|t>>4),i+=int2char(t&15),r=0))}return r==1&&(i+=int2char(u<<2)),i}function b64toBA(n){for(var i=b64tohex(n),r=[],t=0;2*t<i.length;++t)r[t]=parseInt(i.substring(2*t,2*t+2),16);return r}function BigInteger(n,t,i){n!=null&&("number"==typeof n?this.fromNumber(n,t,i):t==null&&"string"!=typeof n?this.fromString(n,256):this.fromString(n,t))}function nbi(){return new BigInteger(null)}function am1(n,t,i,r,u,f){while(--f>=0){var e=t*this[n++]+i[r]+u;u=Math.floor(e/67108864);i[r++]=e&67108863}return u}function am2(n,t,i,r,u,f){for(var o=t&32767,s=t>>15;--f>=0;){var e=this[n]&32767,h=this[n++]>>15,c=s*e+h*o;e=o*e+((c&32767)<<15)+i[r]+(u&1073741823);u=(e>>>30)+(c>>>15)+s*h+(u>>>30);i[r++]=e&1073741823}return u}function am3(n,t,i,r,u,f){for(var o=t&16383,s=t>>14;--f>=0;){var e=this[n]&16383,h=this[n++]>>14,c=s*e+h*o;e=o*e+((c&16383)<<14)+i[r]+u;u=(e>>28)+(c>>14)+s*h;i[r++]=e&268435455}return u}function int2char(n){return BI_RM.charAt(n)}function intAt(n,t){var i=BI_RC[n.charCodeAt(t)];return i==null?-1:i}function bnpCopyTo(n){for(var t=this.t-1;t>=0;--t)n[t]=this[t];n.t=this.t;n.s=this.s}function bnpFromInt(n){this.t=1;this.s=n<0?-1:0;n>0?this[0]=n:n<-1?this[0]=n+this.DV:this.t=0}function nbv(n){var t=nbi();return t.fromInt(n),t}function bnpFromString(n,t){var r,u;if(t==16)r=4;else if(t==8)r=3;else if(t==256)r=8;else if(t==2)r=1;else if(t==32)r=5;else if(t==4)r=2;else{this.fromRadix(n,t);return}this.t=0;this.s=0;for(var f=n.length,e=!1,i=0;--f>=0;){if(u=r==8?n[f]&255:intAt(n,f),u<0){n.charAt(f)=="-"&&(e=!0);continue}e=!1;i==0?this[this.t++]=u:i+r>this.DB?(this[this.t-1]|=(u&(1<<this.DB-i)-1)<<i,this[this.t++]=u>>this.DB-i):this[this.t-1]|=u<<i;i+=r;i>=this.DB&&(i-=this.DB)}r==8&&(n[0]&128)!=0&&(this.s=-1,i>0&&(this[this.t-1]|=(1<<this.DB-i)-1<<i));this.clamp();e&&BigInteger.ZERO.subTo(this,this)}function bnpClamp(){for(var n=this.s&this.DM;this.t>0&&this[this.t-1]==n;)--this.t}function bnToString(n){var t;if(this.s<0)return"-"+this.negate().toString(n);if(n==16)t=4;else if(n==8)t=3;else if(n==2)t=1;else if(n==32)t=5;else if(n==4)t=2;else return this.toRadix(n);var o=(1<<t)-1,u,f=!1,e="",r=this.t,i=this.DB-r*this.DB%t;if(r-->0)for(i<this.DB&&(u=this[r]>>i)>0&&(f=!0,e=int2char(u));r>=0;)i<t?u=(this[r]&(1<<i)-1)<<t-i|this[--r]>>(i+=this.DB-t):(u=this[r]>>(i-=t)&o,i<=0&&(i+=this.DB,--r)),u>0&&(f=!0),f&&(e+=int2char(u));return f?e:"0"}function bnNegate(){var n=nbi();return BigInteger.ZERO.subTo(this,n),n}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(n){var t=this.s-n.s,i;if(t!=0)return t;if(i=this.t,t=i-n.t,t!=0)return this.s<0?-t:t;while(--i>=0)if((t=this[i]-n[i])!=0)return t;return 0}function nbits(n){var i=1,t;return(t=n>>>16)!=0&&(n=t,i+=16),(t=n>>8)!=0&&(n=t,i+=8),(t=n>>4)!=0&&(n=t,i+=4),(t=n>>2)!=0&&(n=t,i+=2),(t=n>>1)!=0&&(n=t,i+=1),i}function bnBitLength(){return this.t<=0?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(n,t){for(var i=this.t-1;i>=0;--i)t[i+n]=this[i];for(i=n-1;i>=0;--i)t[i]=0;t.t=this.t+n;t.s=this.s}function bnpDRShiftTo(n,t){for(var i=n;i<this.t;++i)t[i-n]=this[i];t.t=Math.max(this.t-n,0);t.s=this.s}function bnpLShiftTo(n,t){for(var u=n%this.DB,e=this.DB-u,o=(1<<e)-1,r=Math.floor(n/this.DB),f=this.s<<u&this.DM,i=this.t-1;i>=0;--i)t[i+r+1]=this[i]>>e|f,f=(this[i]&o)<<u;for(i=r-1;i>=0;--i)t[i]=0;t[r]=f;t.t=this.t+r+1;t.s=this.s;t.clamp()}function bnpRShiftTo(n,t){var i,r;if(t.s=this.s,i=Math.floor(n/this.DB),i>=this.t){t.t=0;return}var u=n%this.DB,f=this.DB-u,e=(1<<u)-1;for(t[0]=this[i]>>u,r=i+1;r<this.t;++r)t[r-i-1]|=(this[r]&e)<<f,t[r-i]=this[r]>>u;u>0&&(t[this.t-i-1]|=(this.s&e)<<f);t.t=this.t-i;t.clamp()}function bnpSubTo(n,t){for(var r=0,i=0,u=Math.min(n.t,this.t);r<u;)i+=this[r]-n[r],t[r++]=i&this.DM,i>>=this.DB;if(n.t<this.t){for(i-=n.s;r<this.t;)i+=this[r],t[r++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;r<n.t;)i-=n[r],t[r++]=i&this.DM,i>>=this.DB;i-=n.s}t.s=i<0?-1:0;i<-1?t[r++]=this.DV+i:i>0&&(t[r++]=i);t.t=r;t.clamp()}function bnpMultiplyTo(n,t){var r=this.abs(),u=n.abs(),i=r.t;for(t.t=i+u.t;--i>=0;)t[i]=0;for(i=0;i<u.t;++i)t[i+r.t]=r.am(0,u[i],t,i,0,r.t);t.s=0;t.clamp();this.s!=n.s&&BigInteger.ZERO.subTo(t,t)}function bnpSquareTo(n){for(var i=this.abs(),t=n.t=2*i.t,r;--t>=0;)n[t]=0;for(t=0;t<i.t-1;++t)r=i.am(t,i[t],n,2*t,0,1),(n[t+i.t]+=i.am(t+1,2*i[t],n,2*t+1,r,i.t-t-1))>=i.DV&&(n[t+i.t]-=i.DV,n[t+i.t+1]=1);n.t>0&&(n[n.t-1]+=i.am(t,i[t],n,2*t,0,1));n.s=0;n.clamp()}function bnpDivRemTo(n,t,i){var e=n.abs(),h,u,c,a;if(!(e.t<=0)){if(h=this.abs(),h.t<e.t){t!=null&&t.fromInt(0);i!=null&&this.copyTo(i);return}i==null&&(i=nbi());var r=nbi(),v=this.s,p=n.s,s=this.DB-nbits(e[e.t-1]);if(s>0?(e.lShiftTo(s,r),h.lShiftTo(s,i)):(e.copyTo(r),h.copyTo(i)),u=r.t,c=r[u-1],c!=0){var y=c*(1<<this.F1)+(u>1?r[u-2]>>this.F2:0),w=this.FV/y,b=(1<<this.F1)/y,k=1<<this.F2,o=i.t,l=o-u,f=t==null?nbi():t;for(r.dlShiftTo(l,f),i.compareTo(f)>=0&&(i[i.t++]=1,i.subTo(f,i)),BigInteger.ONE.dlShiftTo(u,f),f.subTo(r,r);r.t<u;)r[r.t++]=0;while(--l>=0)if(a=i[--o]==c?this.DM:Math.floor(i[o]*w+(i[o-1]+k)*b),(i[o]+=r.am(0,a,i,l,0,u))<a)for(r.dlShiftTo(l,f),i.subTo(f,i);i[o]<--a;)i.subTo(f,i);t!=null&&(i.drShiftTo(u,t),v!=p&&BigInteger.ZERO.subTo(t,t));i.t=u;i.clamp();s>0&&i.rShiftTo(s,i);v<0&&BigInteger.ZERO.subTo(i,i)}}}function bnMod(n){var t=nbi();return this.abs().divRemTo(n,null,t),this.s<0&&t.compareTo(BigInteger.ZERO)>0&&n.subTo(t,t),t}function Classic(n){this.m=n}function cConvert(n){return n.s<0||n.compareTo(this.m)>=0?n.mod(this.m):n}function cRevert(n){return n}function cReduce(n){n.divRemTo(this.m,null,n)}function cMulTo(n,t,i){n.multiplyTo(t,i);this.reduce(i)}function cSqrTo(n,t){n.squareTo(t);this.reduce(t)}function bnpInvDigit(){var t,n;return this.t<1?0:(t=this[0],(t&1)==0)?0:(n=t&3,n=n*(2-(t&15)*n)&15,n=n*(2-(t&255)*n)&255,n=n*(2-((t&65535)*n&65535))&65535,n=n*(2-t*n%this.DV)%this.DV,n>0?this.DV-n:-n)}function Montgomery(n){this.m=n;this.mp=n.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<n.DB-15)-1;this.mt2=2*n.t}function montConvert(n){var t=nbi();return n.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),n.s<0&&t.compareTo(BigInteger.ZERO)>0&&this.m.subTo(t,t),t}function montRevert(n){var t=nbi();return n.copyTo(t),this.reduce(t),t}function montReduce(n){for(var i,t,r;n.t<=this.mt2;)n[n.t++]=0;for(i=0;i<this.m.t;++i)for(t=n[i]&32767,r=t*this.mpl+((t*this.mph+(n[i]>>15)*this.mpl&this.um)<<15)&n.DM,t=i+this.m.t,n[t]+=this.m.am(0,r,n,i,0,this.m.t);n[t]>=n.DV;)n[t]-=n.DV,n[++t]++;n.clamp();n.drShiftTo(this.m.t,n);n.compareTo(this.m)>=0&&n.subTo(this.m,n)}function montSqrTo(n,t){n.squareTo(t);this.reduce(t)}function montMulTo(n,t,i){n.multiplyTo(t,i);this.reduce(i)}function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(n,t){var e;if(n>4294967295||n<1)return BigInteger.ONE;var i=nbi(),r=nbi(),u=t.convert(this),f=nbits(n)-1;for(u.copyTo(i);--f>=0;)t.sqrTo(i,r),(n&1<<f)>0?t.mulTo(r,u,i):(e=i,i=r,r=e);return t.revert(i)}function bnModPowInt(n,t){var i;return i=n<256||t.isEven()?new Classic(t):new Montgomery(t),this.exp(n,i)}function bnClone(){var n=nbi();return this.copyTo(n),n}function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;if(this.t==0)return-1}else{if(this.t==1)return this[0];if(this.t==0)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return this.t==0?this.s:this[0]<<24>>24}function bnShortValue(){return this.t==0?this.s:this[0]<<16>>16}function bnpChunkSize(n){return Math.floor(Math.LN2*this.DB/Math.log(n))}function bnSigNum(){return this.s<0?-1:this.t<=0||this.t==1&&this[0]<=0?0:1}function bnpToRadix(n){if(n==null&&(n=10),this.signum()==0||n<2||n>36)return"0";var e=this.chunkSize(n),u=Math.pow(n,e),f=nbv(u),t=nbi(),i=nbi(),r="";for(this.divRemTo(f,t,i);t.signum()>0;)r=(u+i.intValue()).toString(n).substr(1)+r,t.divRemTo(f,t,i);return i.intValue().toString(n)+r}function bnpFromRadix(n,t){var r,f;this.fromInt(0);t==null&&(t=10);var e=this.chunkSize(t),s=Math.pow(t,e),o=!1,u=0,i=0;for(r=0;r<n.length;++r){if(f=intAt(n,r),f<0){n.charAt(r)=="-"&&this.signum()==0&&(o=!0);continue}i=t*i+f;++u>=e&&(this.dMultiply(s),this.dAddOffset(i,0),u=0,i=0)}u>0&&(this.dMultiply(Math.pow(t,u)),this.dAddOffset(i,0));o&&BigInteger.ZERO.subTo(this,this)}function bnpFromNumber(n,t,i){if("number"==typeof t)if(n<2)this.fromInt(1);else for(this.fromNumber(n,i),this.testBit(n-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(n-1),op_or,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(t);)this.dAddOffset(2,0),this.bitLength()>n&&this.subTo(BigInteger.ONE.shiftLeft(n-1),this);else{var r=[],u=n&7;r.length=(n>>3)+1;t.nextBytes(r);u>0?r[0]&=(1<<u)-1:r[0]=0;this.fromString(r,256)}}function bnToByteArray(){var i=this.t,u=[],n,t,r;if(u[0]=this.s,n=this.DB-i*this.DB%8,r=0,i-->0)for(n<this.DB&&(t=this[i]>>n)!=(this.s&this.DM)>>n&&(u[r++]=t|this.s<<this.DB-n);i>=0;)n<8?t=(this[i]&(1<<n)-1)<<8-n|this[--i]>>(n+=this.DB-8):(t=this[i]>>(n-=8)&255,n<=0&&(n+=this.DB,--i)),(t&128)!=0&&(t|=-256),r==0&&(this.s&128)!=(t&128)&&++r,(r>0||t!=this.s)&&(u[r++]=t);return u}function bnEquals(n){return this.compareTo(n)==0}function bnMin(n){return this.compareTo(n)<0?this:n}function bnMax(n){return this.compareTo(n)>0?this:n}function bnpBitwiseTo(n,t,i){for(var u,f=Math.min(n.t,this.t),r=0;r<f;++r)i[r]=t(this[r],n[r]);if(n.t<this.t){for(u=n.s&this.DM,r=f;r<this.t;++r)i[r]=t(this[r],u);i.t=this.t}else{for(u=this.s&this.DM,r=f;r<n.t;++r)i[r]=t(u,n[r]);i.t=n.t}i.s=t(this.s,n.s);i.clamp()}function op_and(n,t){return n&t}function bnAnd(n){var t=nbi();return this.bitwiseTo(n,op_and,t),t}function op_or(n,t){return n|t}function bnOr(n){var t=nbi();return this.bitwiseTo(n,op_or,t),t}function op_xor(n,t){return n^t}function bnXor(n){var t=nbi();return this.bitwiseTo(n,op_xor,t),t}function op_andnot(n,t){return n&~t}function bnAndNot(n){var t=nbi();return this.bitwiseTo(n,op_andnot,t),t}function bnNot(){for(var n=nbi(),t=0;t<this.t;++t)n[t]=this.DM&~this[t];return n.t=this.t,n.s=~this.s,n}function bnShiftLeft(n){var t=nbi();return n<0?this.rShiftTo(-n,t):this.lShiftTo(n,t),t}function bnShiftRight(n){var t=nbi();return n<0?this.lShiftTo(-n,t):this.rShiftTo(n,t),t}function lbit(n){if(n==0)return-1;var t=0;return(n&65535)==0&&(n>>=16,t+=16),(n&255)==0&&(n>>=8,t+=8),(n&15)==0&&(n>>=4,t+=4),(n&3)==0&&(n>>=2,t+=2),(n&1)==0&&++t,t}function bnGetLowestSetBit(){for(var n=0;n<this.t;++n)if(this[n]!=0)return n*this.DB+lbit(this[n]);return this.s<0?this.t*this.DB:-1}function cbit(n){for(var t=0;n!=0;)n&=n-1,++t;return t}function bnBitCount(){for(var t=0,i=this.s&this.DM,n=0;n<this.t;++n)t+=cbit(this[n]^i);return t}function bnTestBit(n){var t=Math.floor(n/this.DB);return t>=this.t?this.s!=0:(this[t]&1<<n%this.DB)!=0}function bnpChangeBit(n,t){var i=BigInteger.ONE.shiftLeft(n);return this.bitwiseTo(i,t,i),i}function bnSetBit(n){return this.changeBit(n,op_or)}function bnClearBit(n){return this.changeBit(n,op_andnot)}function bnFlipBit(n){return this.changeBit(n,op_xor)}function bnpAddTo(n,t){for(var r=0,i=0,u=Math.min(n.t,this.t);r<u;)i+=this[r]+n[r],t[r++]=i&this.DM,i>>=this.DB;if(n.t<this.t){for(i+=n.s;r<this.t;)i+=this[r],t[r++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;r<n.t;)i+=n[r],t[r++]=i&this.DM,i>>=this.DB;i+=n.s}t.s=i<0?-1:0;i>0?t[r++]=i:i<-1&&(t[r++]=this.DV+i);t.t=r;t.clamp()}function bnAdd(n){var t=nbi();return this.addTo(n,t),t}function bnSubtract(n){var t=nbi();return this.subTo(n,t),t}function bnMultiply(n){var t=nbi();return this.multiplyTo(n,t),t}function bnSquare(){var n=nbi();return this.squareTo(n),n}function bnDivide(n){var t=nbi();return this.divRemTo(n,t,null),t}function bnRemainder(n){var t=nbi();return this.divRemTo(n,null,t),t}function bnDivideAndRemainder(n){var t=nbi(),i=nbi();return this.divRemTo(n,t,i),[t,i]}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp()}function bnpDAddOffset(n,t){if(n!=0){while(this.t<=t)this[this.t++]=0;for(this[t]+=n;this[t]>=this.DV;)this[t]-=this.DV,++t>=this.t&&(this[this.t++]=0),++this[t]}}function NullExp(){}function nNop(n){return n}function nMulTo(n,t,i){n.multiplyTo(t,i)}function nSqrTo(n,t){n.squareTo(t)}function bnPow(n){return this.exp(n,new NullExp)}function bnpMultiplyLowerTo(n,t,i){var r=Math.min(this.t+n.t,t),u;for(i.s=0,i.t=r;r>0;)i[--r]=0;for(u=i.t-this.t;r<u;++r)i[r+this.t]=this.am(0,n[r],i,r,0,this.t);for(u=Math.min(n.t,t);r<u;++r)this.am(0,n[r],i,r,0,t-r);i.clamp()}function bnpMultiplyUpperTo(n,t,i){--t;var r=i.t=this.t+n.t-t;for(i.s=0;--r>=0;)i[r]=0;for(r=Math.max(t-this.t,0);r<n.t;++r)i[this.t+r-t]=this.am(t-r,n[r],i,0,0,this.t+r-t);i.clamp();i.drShiftTo(1,i)}function Barrett(n){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*n.t,this.r2);this.mu=this.r2.divide(n);this.m=n}function barrettConvert(n){if(n.s<0||n.t>2*this.m.t)return n.mod(this.m);if(n.compareTo(this.m)<0)return n;var t=nbi();return n.copyTo(t),this.reduce(t),t}function barrettRevert(n){return n}function barrettReduce(n){for(n.drShiftTo(this.m.t-1,this.r2),n.t>this.m.t+1&&(n.t=this.m.t+1,n.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);n.compareTo(this.r2)<0;)n.dAddOffset(1,this.m.t+1);for(n.subTo(this.r2,n);n.compareTo(this.m)>=0;)n.subTo(this.m,n)}function barrettSqrTo(n,t){n.squareTo(t);this.reduce(t)}function barrettMulTo(n,t,i){n.multiplyTo(t,i);this.reduce(i)}function bnModPow(n,t){var i=n.bitLength(),c,r=nbv(1),f,v;if(i<=0)return r;c=i<18?1:i<48?3:i<144?4:i<768?5:6;f=i<8?new Classic(t):t.isEven()?new Barrett(t):new Montgomery(t);var s=[],u=3,l=c-1,y=(1<<c)-1;if(s[1]=f.convert(this),c>1)for(v=nbi(),f.sqrTo(s[1],v);u<=y;)s[u]=nbi(),f.mulTo(v,s[u-2],s[u]),u+=2;var e=n.t-1,h,p=!0,o=nbi(),a;for(i=nbits(n[e])-1;e>=0;){for(i>=l?h=n[e]>>i-l&y:(h=(n[e]&(1<<i+1)-1)<<l-i,e>0&&(h|=n[e-1]>>this.DB+i-l)),u=c;(h&1)==0;)h>>=1,--u;if((i-=u)<0&&(i+=this.DB,--e),p)s[h].copyTo(r),p=!1;else{while(u>1)f.sqrTo(r,o),f.sqrTo(o,r),u-=2;u>0?f.sqrTo(r,o):(a=r,r=o,o=a);f.mulTo(o,s[h],r)}while(e>=0&&(n[e]&1<<i)==0)f.sqrTo(r,o),a=r,r=o,o=a,--i<0&&(i=this.DB-1,--e)}return f.revert(r)}function bnGCD(n){var i=this.s<0?this.negate():this.clone(),t=n.s<0?n.negate():n.clone(),f,u,r;if(i.compareTo(t)<0&&(f=i,i=t,t=f),u=i.getLowestSetBit(),r=t.getLowestSetBit(),r<0)return i;for(u<r&&(r=u),r>0&&(i.rShiftTo(r,i),t.rShiftTo(r,t));i.signum()>0;)(u=i.getLowestSetBit())>0&&i.rShiftTo(u,i),(u=t.getLowestSetBit())>0&&t.rShiftTo(u,t),i.compareTo(t)>=0?(i.subTo(t,i),i.rShiftTo(1,i)):(t.subTo(i,t),t.rShiftTo(1,t));return r>0&&t.lShiftTo(r,t),t}function bnpModInt(n){var r,t,i;if(n<=0)return 0;if(r=this.DV%n,t=this.s<0?n-1:0,this.t>0)if(r==0)t=this[0]%n;else for(i=this.t-1;i>=0;--i)t=(r*t+this[i])%n;return t}function bnModInverse(n){var o=n.isEven();if(this.isEven()&&o||n.signum()==0)return BigInteger.ZERO;for(var r=n.clone(),u=this.clone(),f=nbv(1),i=nbv(0),e=nbv(0),t=nbv(1);r.signum()!=0;){while(r.isEven())r.rShiftTo(1,r),o?(f.isEven()&&i.isEven()||(f.addTo(this,f),i.subTo(n,i)),f.rShiftTo(1,f)):i.isEven()||i.subTo(n,i),i.rShiftTo(1,i);while(u.isEven())u.rShiftTo(1,u),o?(e.isEven()&&t.isEven()||(e.addTo(this,e),t.subTo(n,t)),e.rShiftTo(1,e)):t.isEven()||t.subTo(n,t),t.rShiftTo(1,t);r.compareTo(u)>=0?(r.subTo(u,r),o&&f.subTo(e,f),i.subTo(t,i)):(u.subTo(r,u),o&&e.subTo(f,e),t.subTo(i,t))}if(u.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO;if(t.compareTo(n)>=0)return t.subtract(n);if(t.signum()<0)t.addTo(n,t);else return t;return t.signum()<0?t.add(n):t}function bnIsProbablePrime(n){var t,i=this.abs(),r,u;if(i.t==1&&i[0]<=lowprimes[lowprimes.length-1]){for(t=0;t<lowprimes.length;++t)if(i[0]==lowprimes[t])return!0;return!1}if(i.isEven())return!1;for(t=1;t<lowprimes.length;){for(r=lowprimes[t],u=t+1;u<lowprimes.length&&r<lplim;)r*=lowprimes[u++];for(r=i.modInt(r);t<u;)if(r%lowprimes[t++]==0)return!1}return i.millerRabin(n)}function bnpMillerRabin(n){var i=this.subtract(BigInteger.ONE),r=i.getLowestSetBit(),e,u,f,t,o;if(r<=0)return!1;for(e=i.shiftRight(r),n=n+1>>1,n>lowprimes.length&&(n=lowprimes.length),u=nbi(),f=0;f<n;++f)if(u.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]),t=u.modPow(e,this),t.compareTo(BigInteger.ONE)!=0&&t.compareTo(i)!=0){for(o=1;o++<r&&t.compareTo(i)!=0;)if(t=t.modPowInt(2,this),t.compareTo(BigInteger.ONE)==0)return!1;if(t.compareTo(i)!=0)return!1}return!0}function parseBigInt(n,t){return new BigInteger(n,t)}function linebrk(n,t){for(var r="",i=0;i+t<n.length;)r+=n.substring(i,i+t)+"\n",i+=t;return r+n.substring(i,n.length)}function byte2Hex(n){return n<16?"0"+n.toString(16):n.toString(16)}function pkcs1pad2(n,t){var i,f,r,e,u;if(t<n.length+11)return alert("Message too long for RSA"),null;for(i=[],f=n.length-1;f>=0&&t>0;)r=n.charCodeAt(f--),r<128?i[--t]=r:r>127&&r<2048?(i[--t]=r&63|128,i[--t]=r>>6|192):(i[--t]=r&63|128,i[--t]=r>>6&63|128,i[--t]=r>>12|224);for(i[--t]=0,e=new SecureRandom,u=[];t>2;){for(u[0]=0;u[0]==0;)e.nextBytes(u);i[--t]=u[0]}return i[--t]=2,i[--t]=0,new BigInteger(i)}function oaep_mgf1_arr(n,t,i){for(var u="",r=0;u.length<t;)u+=i(String.fromCharCode.apply(String,n.concat([(r&4278190080)>>24,(r&16711680)>>16,(r&65280)>>8,r&255]))),r+=1;return u}function oaep_pad(n,t,i){var o,r,f,u,h,e,c,s;if(n.length+2*SHA1_SIZE+2>t)throw"Message too long for RSA";for(o="",r=0;r<t-n.length-2*SHA1_SIZE-2;r+=1)o+="\x00";for(f=rstr_sha1("")+o+"\x01"+n,u=new Array(SHA1_SIZE),(new SecureRandom).nextBytes(u),h=oaep_mgf1_arr(u,f.length,i||rstr_sha1),e=[],r=0;r<f.length;r+=1)e[r]=f.charCodeAt(r)^h.charCodeAt(r);for(c=oaep_mgf1_arr(e,u.length,rstr_sha1),s=[0],r=0;r<u.length;r+=1)s[r+1]=u[r]^c.charCodeAt(r);return new BigInteger(s.concat(e))}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function RSASetPublic(n,t){this.isPublic=!0;typeof n!="string"?(this.n=n,this.e=t):n!=null&&t!=null&&n.length>0&&t.length>0?(this.n=parseBigInt(n,16),this.e=parseInt(t,16)):alert("Invalid RSA public key")}function RSADoPublic(n){return n.modPowInt(this.e,this.n)}function RSAEncrypt(n){var r=pkcs1pad2(n,this.n.bitLength()+7>>3),i,t;return r==null?null:(i=this.doPublic(r),i==null)?null:(t=i.toString(16),(t.length&1)==0?t:"0"+t)}function RSAEncryptOAEP(n,t){var u=oaep_pad(n,this.n.bitLength()+7>>3,t),r,i;return u==null?null:(r=this.doPublic(u),r==null)?null:(i=r.toString(16),(i.length&1)==0?i:"0"+i)}function pkcs1unpad2(n,t){for(var r=n.toByteArray(),i=0,f,u;i<r.length&&r[i]==0;)++i;if(r.length-i!=t-1||r[i]!=2)return null;for(++i;r[i]!=0;)if(++i>=r.length)return null;for(f="";++i<r.length;)u=r[i]&255,u<128?f+=String.fromCharCode(u):u>191&&u<224?(f+=String.fromCharCode((u&31)<<6|r[i+1]&63),++i):(f+=String.fromCharCode((u&15)<<12|(r[i+1]&63)<<6|r[i+2]&63),i+=2);return f}function oaep_mgf1_str(n,t,i){for(var u="",r=0;u.length<t;)u+=i(n+String.fromCharCode.apply(String,[(r&4278190080)>>24,(r&16711680)>>16,(r&65280)>>8,r&255])),r+=1;return u}function oaep_unpad(n,t,i){var r,h,u,f,c;for(n=n.toByteArray(),r=0;r<n.length;r+=1)n[r]&=255;while(n.length<t)n.unshift(0);if(n=String.fromCharCode.apply(String,n),n.length<2*SHA1_SIZE+2)throw"Cipher too short";for(var o=n.substr(1,SHA1_SIZE),e=n.substr(SHA1_SIZE+1),l=oaep_mgf1_str(e,SHA1_SIZE,i||rstr_sha1),s=[],r=0;r<o.length;r+=1)s[r]=o.charCodeAt(r)^l.charCodeAt(r);for(h=oaep_mgf1_str(String.fromCharCode.apply(String,s),n.length-SHA1_SIZE,rstr_sha1),u=[],r=0;r<e.length;r+=1)u[r]=e.charCodeAt(r)^h.charCodeAt(r);if(u=String.fromCharCode.apply(String,u),u.substr(0,SHA1_SIZE)!==rstr_sha1(""))throw"Hash mismatch";if(u=u.substr(SHA1_SIZE),f=u.indexOf("\x01"),c=f!=-1?u.substr(0,f).lastIndexOf("\x00"):-1,c+1!=f)throw"Malformed data";return u.substr(f+1)}function RSASetPrivate(n,t,i){this.isPrivate=!0;typeof n!="string"?(this.n=n,this.e=t,this.d=i):n!=null&&t!=null&&n.length>0&&t.length>0?(this.n=parseBigInt(n,16),this.e=parseInt(t,16),this.d=parseBigInt(i,16)):alert("Invalid RSA private key")}function RSASetPrivateEx(n,t,i,r,u,f,e,o){if(this.isPrivate=!0,n==null)throw"RSASetPrivateEx N == null";if(t==null)throw"RSASetPrivateEx E == null";if(n.length==0)throw"RSASetPrivateEx N.length == 0";if(t.length==0)throw"RSASetPrivateEx E.length == 0";n!=null&&t!=null&&n.length>0&&t.length>0?(this.n=parseBigInt(n,16),this.e=parseInt(t,16),this.d=parseBigInt(i,16),this.p=parseBigInt(r,16),this.q=parseBigInt(u,16),this.dmp1=parseBigInt(f,16),this.dmq1=parseBigInt(e,16),this.coeff=parseBigInt(o,16)):alert("Invalid RSA private key in RSASetPrivateEx")}function RSAGenerate(n,t){var r=new SecureRandom,u=n>>1,i,f;for(this.e=parseInt(t,16),i=new BigInteger(t,16);;){for(;;)if(this.p=new BigInteger(n-u,1,r),this.p.subtract(BigInteger.ONE).gcd(i).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10))break;for(;;)if(this.q=new BigInteger(u,1,r),this.q.subtract(BigInteger.ONE).gcd(i).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10))break;this.p.compareTo(this.q)<=0&&(f=this.p,this.p=this.q,this.q=f);var e=this.p.subtract(BigInteger.ONE),o=this.q.subtract(BigInteger.ONE),s=e.multiply(o);if(s.gcd(i).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);this.d=i.modInverse(s);this.dmp1=this.d.mod(e);this.dmq1=this.d.mod(o);this.coeff=this.q.modInverse(this.p);break}}this.isPrivate=!0}function RSADoPrivate(n){if(this.p==null||this.q==null)return n.modPow(this.d,this.n);for(var t=n.mod(this.p).modPow(this.dmp1,this.p),i=n.mod(this.q).modPow(this.dmq1,this.q);t.compareTo(i)<0;)t=t.add(this.p);return t.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)}function RSADecrypt(n){var i=parseBigInt(n,16),t=this.doPrivate(i);return t==null?null:pkcs1unpad2(t,this.n.bitLength()+7>>3)}function RSADecryptOAEP(n,t){var r=parseBigInt(n,16),i=this.doPrivate(r);return i==null?null:oaep_unpad(i,this.n.bitLength()+7>>3,t)}function _rsapem_pemToBase64(n){var t=n;return t=t.replace("-----BEGIN RSA PRIVATE KEY-----",""),t=t.replace("-----END RSA PRIVATE KEY-----",""),t.replace(/[ \n]+/g,"")}function _rsapem_getPosArrayOfChildrenFromHex(n){var t=[],i=ASN1HEX.getStartPosOfV_AtObj(n,0),r=ASN1HEX.getPosOfNextSibling_AtObj(n,i),u=ASN1HEX.getPosOfNextSibling_AtObj(n,r),f=ASN1HEX.getPosOfNextSibling_AtObj(n,u),e=ASN1HEX.getPosOfNextSibling_AtObj(n,f),o=ASN1HEX.getPosOfNextSibling_AtObj(n,e),s=ASN1HEX.getPosOfNextSibling_AtObj(n,o),h=ASN1HEX.getPosOfNextSibling_AtObj(n,s),c=ASN1HEX.getPosOfNextSibling_AtObj(n,h);return t.push(i,r,u,f,e,o,s,h,c),t}function _rsapem_getHexValueArrayOfChildrenFromHex(n){var t=_rsapem_getPosArrayOfChildrenFromHex(n),r=ASN1HEX.getHexOfV_AtObj(n,t[0]),u=ASN1HEX.getHexOfV_AtObj(n,t[1]),f=ASN1HEX.getHexOfV_AtObj(n,t[2]),e=ASN1HEX.getHexOfV_AtObj(n,t[3]),o=ASN1HEX.getHexOfV_AtObj(n,t[4]),s=ASN1HEX.getHexOfV_AtObj(n,t[5]),h=ASN1HEX.getHexOfV_AtObj(n,t[6]),c=ASN1HEX.getHexOfV_AtObj(n,t[7]),l=ASN1HEX.getHexOfV_AtObj(n,t[8]),i=[];return i.push(r,u,f,e,o,s,h,c,l),i}function _rsapem_readPrivateKeyFromASN1HexString(n){var t=_rsapem_getHexValueArrayOfChildrenFromHex(n);this.setPrivateEx(t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])}function _rsapem_readPrivateKeyFromPEMString(n){var i=_rsapem_pemToBase64(n),r=b64tohex(i),t=_rsapem_getHexValueArrayOfChildrenFromHex(r);this.setPrivateEx(t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])}function _rsasign_getHexPaddedDigestInfoForString(n,t,i){var r=function(n){return KJUR.crypto.Util.hashString(n,i)},u=r(n);return KJUR.crypto.Util.getPaddedDigestInfoHex(u,i,t)}function _zeroPaddingOfSignature(n,t){for(var i="",u=t/4-n.length,r=0;r<u;r++)i=i+"0";return i+n}function _rsasign_signString(n,t){var i=function(n){return KJUR.crypto.Util.hashString(n,t)},r=i(n);return this.signWithMessageHash(r,t)}function _rsasign_signWithMessageHash(n,t){var i=KJUR.crypto.Util.getPaddedDigestInfoHex(n,t,this.n.bitLength()),r=parseBigInt(i,16),u=this.doPrivate(r),f=u.toString(16);return _zeroPaddingOfSignature(f,this.n.bitLength())}function _rsasign_signStringWithSHA1(n){return _rsasign_signString.call(this,n,"sha1")}function _rsasign_signStringWithSHA256(n){return _rsasign_signString.call(this,n,"sha256")}function pss_mgf1_str(n,t,i){for(var u="",r=0;u.length<t;)u+=hextorstr(i(rstrtohex(n+String.fromCharCode.apply(String,[(r&4278190080)>>24,(r&16711680)>>16,(r&65280)>>8,r&255])))),r+=1;return u}function _rsasign_signStringPSS(n,t,i){var r=function(n){return KJUR.crypto.Util.hashHex(n,t)},u=r(rstrtohex(n));return i===undefined&&(i=-1),this.signWithMessageHashPSS(u,t,i)}function _rsasign_signWithMessageHashPSS(n,t,i){var l=hextorstr(n),f=l.length,a=this.n.bitLength()-1,o=Math.ceil(a/8),r,v=function(n){return KJUR.crypto.Util.hashHex(n,t)},u,s,h,y;if(i===-1||i===undefined)i=f;else if(i===-2)i=o-f-2;else if(i<-2)throw"invalid salt length";if(o<f+i+2)throw"data too long";for(u="",i>0&&(u=new Array(i),(new SecureRandom).nextBytes(u),u=String.fromCharCode.apply(String,u)),s=hextorstr(v(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+l+u))),h=[],r=0;r<o-i-f-2;r+=1)h[r]=0;var c=String.fromCharCode.apply(String,h)+"\x01"+u,p=pss_mgf1_str(s,c.length,v),e=[];for(r=0;r<c.length;r+=1)e[r]=c.charCodeAt(r)^p.charCodeAt(r);for(y=65280>>8*o-a&255,e[0]&=~y,r=0;r<f;r++)e.push(s.charCodeAt(r));return e.push(188),_zeroPaddingOfSignature(this.doPrivate(new BigInteger(e)).toString(16),this.n.bitLength())}function _rsasign_getDecryptSignatureBI(n,t,i){var r=new RSAKey;return r.setPublic(t,i),r.doPublic(n)}function _rsasign_getHexDigestInfoFromSig(n,t,i){var r=_rsasign_getDecryptSignatureBI(n,t,i);return r.toString(16).replace(/^1f+00/,"")}function _rsasign_getAlgNameAndHashFromHexDisgestInfo(n){var t,i,r;for(t in KJUR.crypto.Util.DIGESTINFOHEAD)if(i=KJUR.crypto.Util.DIGESTINFOHEAD[t],r=i.length,n.substring(0,r)==i)return[t,n.substring(r)];return[]}function _rsasign_verifySignatureWithArgs(n,t,i,r){var f=_rsasign_getHexDigestInfoFromSig(t,i,r),u=_rsasign_getAlgNameAndHashFromHexDisgestInfo(f);if(u.length==0)return!1;var e=u[0],o=u[1],s=function(n){return KJUR.crypto.Util.hashString(n,e)},h=s(n);return o==h}function _rsasign_verifyHexSignatureForMessage(n,t){var i=parseBigInt(n,16);return _rsasign_verifySignatureWithArgs(t,i,this.n.toString(16),this.e.toString(16))}function _rsasign_verifyString(n,t){var i;if(t=t.replace(_RE_HEXDECONLY,""),t=t.replace(/[ \n]+/g,""),i=parseBigInt(t,16),i.bitLength()>this.n.bitLength())return 0;var u=this.doPublic(i),f=u.toString(16).replace(/^1f+00/,""),r=_rsasign_getAlgNameAndHashFromHexDisgestInfo(f);if(r.length==0)return!1;var e=r[0],o=r[1],s=function(n){return KJUR.crypto.Util.hashString(n,e)},h=s(n);return o==h}function _rsasign_verifyWithMessageHash(n,t){var i,o,u;if(t=t.replace(_RE_HEXDECONLY,""),t=t.replace(/[ \n]+/g,""),i=parseBigInt(t,16),i.bitLength()>this.n.bitLength())return 0;var f=this.doPublic(i),e=f.toString(16).replace(/^1f+00/,""),r=_rsasign_getAlgNameAndHashFromHexDisgestInfo(e);return r.length==0?!1:(o=r[0],u=r[1],u==n)}function _rsasign_verifyStringPSS(n,t,i,r){var u=function(n){return KJUR.crypto.Util.hashHex(n,i)},f=u(rstrtohex(n));return r===undefined&&(r=-1),this.verifyWithMessageHashPSS(f,t,i,r)}function _rsasign_verifyWithMessageHashPSS(n,t,i,r){var l=new BigInteger(t,16),f,b,s,c;if(l.bitLength()>this.n.bitLength())return!1;var a=function(n){return KJUR.crypto.Util.hashHex(n,i)},v=hextorstr(n),o=v.length,y=this.n.bitLength()-1,e=Math.ceil(y/8),u;if(r===-1||r===undefined)r=o;else if(r===-2)r=e-o-2;else if(r<-2)throw"invalid salt length";if(e<o+r+2)throw"data too long";for(f=this.doPublic(l).toByteArray(),u=0;u<f.length;u+=1)f[u]&=255;while(f.length<e)f.unshift(0);if(f[e-1]!==188)throw"encoded message does not end in 0xbc";f=String.fromCharCode.apply(String,f);var h=f.substr(0,e-o-1),p=f.substr(h.length,o),w=65280>>8*e-y&255;if((h.charCodeAt(0)&w)!=0)throw"bits beyond keysize not zero";for(b=pss_mgf1_str(p,h.length,a),s=[],u=0;u<h.length;u+=1)s[u]=h.charCodeAt(u)^b.charCodeAt(u);for(s[0]&=~w,c=e-o-r-2,u=0;u<c;u+=1)if(s[u]!==0)throw"leftmost octets not zero";if(s[c]!==1)throw"0x01 marker not found";return p===hextorstr(a(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00"+v+String.fromCharCode.apply(String,s.slice(-r)))))}function X509(){this.subjectPublicKeyRSA=null;this.subjectPublicKeyRSA_hN=null;this.subjectPublicKeyRSA_hE=null;this.hex=null;this.getSerialNumberHex=function(){return ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,1])};this.getIssuerHex=function(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3])};this.getIssuerString=function(){return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3]))};this.getSubjectHex=function(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5])};this.getSubjectString=function(){return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5]))};this.getNotBefore=function(){var n=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,0]);return n=n.replace(/(..)/g,"%$1"),decodeURIComponent(n)};this.getNotAfter=function(){var n=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,1]);return n=n.replace(/(..)/g,"%$1"),decodeURIComponent(n)};this.readCertPEM=function(n){var i=X509.pemToHex(n),t=X509.getPublicKeyHexArrayFromCertHex(i),r=new RSAKey;r.setPublic(t[0],t[1]);this.subjectPublicKeyRSA=r;this.subjectPublicKeyRSA_hN=t[0];this.subjectPublicKeyRSA_hE=t[1];this.hex=i};this.readCertPEMWithoutRSAInit=function(n){var i=X509.pemToHex(n),t=X509.getPublicKeyHexArrayFromCertHex(i);this.subjectPublicKeyRSA.setPublic(t[0],t[1]);this.subjectPublicKeyRSA_hN=t[0];this.subjectPublicKeyRSA_hE=t[1];this.hex=i}}function Base64x(){}function stoBA(n){for(var i=[],t=0;t<n.length;t++)i[t]=n.charCodeAt(t);return i}function BAtos(n){for(var t="",i=0;i<n.length;i++)t=t+String.fromCharCode(n[i]);return t}function BAtohex(n){for(var t,i="",r=0;r<n.length;r++)t=n[r].toString(16),t.length==1&&(t="0"+t),i=i+t;return i}function stohex(n){return BAtohex(stoBA(n))}function stob64(n){return hex2b64(stohex(n))}function stob64u(n){return b64tob64u(hex2b64(stohex(n)))}function b64utos(n){return BAtos(b64toBA(b64utob64(n)))}function b64tob64u(n){return n=n.replace(/\=/g,""),n=n.replace(/\+/g,"-"),n.replace(/\//g,"_")}function b64utob64(n){return n.length%4==2?n=n+"==":n.length%4==3&&(n=n+"="),n=n.replace(/-/g,"+"),n.replace(/_/g,"/")}function hextob64u(n){return b64tob64u(hex2b64(n))}function b64utohex(n){return b64tohex(b64utob64(n))}function utf8tob64(n){return hex2b64(uricmptohex(encodeURIComponentAll(n)))}function b64toutf8(n){return decodeURIComponent(hextouricmp(b64tohex(n)))}function utf8tohex(n){return uricmptohex(encodeURIComponentAll(n))}function hextoutf8(n){return decodeURIComponent(hextouricmp(n))}function hextorstr(n){for(var i="",t=0;t<n.length-1;t+=2)i+=String.fromCharCode(parseInt(n.substr(t,2),16));return i}function rstrtohex(n){for(var i="",t=0;t<n.length;t++)i+=("0"+n.charCodeAt(t).toString(16)).slice(-2);return i}function hextob64(n){return hex2b64(n)}function hextob64nl(n){var t=hextob64(n),i=t.replace(/(.{64})/g,"$1\r\n");return i.replace(/\r\n$/,"")}function b64nltohex(n){var t=n.replace(/[^0-9A-Za-z\/+=]*/g,"");return b64tohex(t)}function uricmptohex(n){return n.replace(/%/g,"")}function hextouricmp(n){return n.replace(/(..)/g,"%$1")}function encodeURIComponentAll(n){for(var r=encodeURIComponent(n),i="",t=0;t<r.length;t++)r[t]=="%"?(i=i+r.substr(t,3),t=t+2):i=i+"%"+stohex(r[t]);return i}function newline_toUnix(n){return n.replace(/\r\n/mg,"\n")}function newline_toDos(n){return n=n.replace(/\r\n/mg,"\n"),n.replace(/\n/mg,"\r\n")}var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64pad="=",dbits,canary=0xdeadbeefcafe,j_lm=(canary&16777215)==15715070,BI_FP,BI_RM,BI_RC,rr,vv,lowprimes,lplim,SHA1_SIZE,_RE_HEXDECONLY,ASN1HEX,utf8tob64u,b64utoutf8;for(j_lm&&navigator.appName=="Microsoft Internet Explorer"?(BigInteger.prototype.am=am2,dbits=30):j_lm&&navigator.appName!="Netscape"?(BigInteger.prototype.am=am1,dbits=26):(BigInteger.prototype.am=am3,dbits=28),BigInteger.prototype.DB=dbits,BigInteger.prototype.DM=(1<<dbits)-1,BigInteger.prototype.DV=1<<dbits,BI_FP=52,BigInteger.prototype.FV=Math.pow(2,BI_FP),BigInteger.prototype.F1=BI_FP-dbits,BigInteger.prototype.F2=2*dbits-BI_FP,BI_RM="0123456789abcdefghijklmnopqrstuvwxyz",BI_RC=[],rr="0".charCodeAt(0),vv=0;vv<=9;++vv)BI_RC[rr++]=vv;for(rr="a".charCodeAt(0),vv=10;vv<36;++vv)BI_RC[rr++]=vv;for(rr="A".charCodeAt(0),vv=10;vv<36;++vv)BI_RC[rr++]=vv;Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;Barrett.prototype.convert=barrettConvert;Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];lplim=67108864/lowprimes[lowprimes.length-1];BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;BigInteger.prototype.modInt=bnpModInt;BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;BigInteger.prototype.xor=bnXor;BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;BigInteger.prototype.square=bnSquare;SHA1_SIZE=20;RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;RSAKey.prototype.encryptOAEP=RSAEncryptOAEP;RSAKey.prototype.type="RSA";SHA1_SIZE=20;RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;RSAKey.prototype.decryptOAEP=RSADecryptOAEP;RSAKey.prototype.readPrivateKeyFromPEMString=_rsapem_readPrivateKeyFromPEMString;RSAKey.prototype.readPrivateKeyFromASN1HexString=_rsapem_readPrivateKeyFromASN1HexString;_RE_HEXDECONLY=new RegExp("");_RE_HEXDECONLY.compile("[^0-9a-f]","gi");RSAKey.prototype.signWithMessageHash=_rsasign_signWithMessageHash;RSAKey.prototype.signString=_rsasign_signString;RSAKey.prototype.signStringWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signStringWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.sign=_rsasign_signString;RSAKey.prototype.signWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.signWithMessageHashPSS=_rsasign_signWithMessageHashPSS;RSAKey.prototype.signStringPSS=_rsasign_signStringPSS;RSAKey.prototype.signPSS=_rsasign_signStringPSS;RSAKey.SALT_LEN_HLEN=-1;RSAKey.SALT_LEN_MAX=-2;RSAKey.prototype.verifyWithMessageHash=_rsasign_verifyWithMessageHash;RSAKey.prototype.verifyString=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verify=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForByteArrayMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verifyWithMessageHashPSS=_rsasign_verifyWithMessageHashPSS;RSAKey.prototype.verifyStringPSS=_rsasign_verifyStringPSS;RSAKey.prototype.verifyPSS=_rsasign_verifyStringPSS;RSAKey.SALT_LEN_RECOVER=-2;ASN1HEX=new function(){this.getByteLengthOfL_AtObj=function(n,t){if(n.substring(t+2,t+3)!="8")return 1;var i=parseInt(n.substring(t+3,t+4));return i==0?-1:0<i&&i<10?i+1:-2};this.getHexOfL_AtObj=function(n,t){var i=this.getByteLengthOfL_AtObj(n,t);return i<1?"":n.substring(t+2,t+2+i*2)};this.getIntOfL_AtObj=function(n,t){var i=this.getHexOfL_AtObj(n,t),r;return i==""?-1:(r=parseInt(i.substring(0,1))<8?new BigInteger(i,16):new BigInteger(i.substring(2),16),r.intValue())};this.getStartPosOfV_AtObj=function(n,t){var i=this.getByteLengthOfL_AtObj(n,t);return i<0?i:t+(i+1)*2};this.getHexOfV_AtObj=function(n,t){var i=this.getStartPosOfV_AtObj(n,t),r=this.getIntOfL_AtObj(n,t);return n.substring(i,i+r*2)};this.getHexOfTLV_AtObj=function(n,t){var i=n.substr(t,2),r=this.getHexOfL_AtObj(n,t),u=this.getHexOfV_AtObj(n,t);return i+r+u};this.getPosOfNextSibling_AtObj=function(n,t){var i=this.getStartPosOfV_AtObj(n,t),r=this.getIntOfL_AtObj(n,t);return i+r*2};this.getPosArrayOfChildren_AtObj=function(n,t){var r=[],u=this.getStartPosOfV_AtObj(n,t),i;r.push(u);for(var o=this.getIntOfL_AtObj(n,t),f=u,e=0;;){if(i=this.getPosOfNextSibling_AtObj(n,f),i==null||i-u>=o*2)break;if(e>=200)break;r.push(i);f=i;e++}return r};this.getNthChildIndex_AtObj=function(n,t,i){var r=this.getPosArrayOfChildren_AtObj(n,t);return r[i]};this.getDecendantIndexByNthList=function(n,t,i){if(i.length==0)return t;var r=i.shift(),u=this.getPosArrayOfChildren_AtObj(n,t);return this.getDecendantIndexByNthList(n,u[r],i)};this.getDecendantHexTLVByNthList=function(n,t,i){var r=this.getDecendantIndexByNthList(n,t,i);return this.getHexOfTLV_AtObj(n,r)};this.getDecendantHexVByNthList=function(n,t,i){var r=this.getDecendantIndexByNthList(n,t,i);return this.getHexOfV_AtObj(n,r)}};ASN1HEX.getVbyList=function(n,t,i,r){var u=this.getDecendantIndexByNthList(n,t,i);if(u===undefined)throw"can't find nthList object";if(r!==undefined&&n.substr(u,2)!=r)throw"checking tag doesn't match: "+n.substr(u,2)+"!="+r;return this.getHexOfV_AtObj(n,u)};ASN1HEX.hextooidstr=function(n){var s=function(n,t){return n.length>=t?n:new Array(t-n.length+1).join("0")+n},e=[],c=n.substr(0,2),h=parseInt(c,16),o,r,u,i,t,f;for(e[0]=new String(Math.floor(h/40)),e[1]=new String(h%40),o=n.substr(2),r=[],t=0;t<o.length/2;t++)r.push(parseInt(o.substr(t*2,2),16));for(u=[],i="",t=0;t<r.length;t++)r[t]&128?i=i+s((r[t]&127).toString(2),7):(i=i+s((r[t]&127).toString(2),7),u.push(new String(parseInt(i,2))),i="");return f=e.join("."),u.length>0&&(f=f+"."+u.join(".")),f};X509.pemToBase64=function(n){var t=n;return t=t.replace("-----BEGIN CERTIFICATE-----",""),t=t.replace("-----END CERTIFICATE-----",""),t.replace(/[ \n]+/g,"")};X509.pemToHex=function(n){var t=X509.pemToBase64(n);return b64tohex(t)};X509.getSubjectPublicKeyPosFromCertHex=function(n){var u=X509.getSubjectPublicKeyInfoPosFromCertHex(n),r,t,i;return u==-1?-1:(r=ASN1HEX.getPosArrayOfChildren_AtObj(n,u),r.length!=2)?-1:(t=r[1],n.substring(t,t+2)!="03")?-1:(i=ASN1HEX.getStartPosOfV_AtObj(n,t),n.substring(i,i+2)!="00")?-1:i+2};X509.getSubjectPublicKeyInfoPosFromCertHex=function(n){var i=ASN1HEX.getStartPosOfV_AtObj(n,0),t=ASN1HEX.getPosArrayOfChildren_AtObj(n,i);return t.length<1?-1:n.substring(t[0],t[0]+10)=="a003020102"?t.length<6?-1:t[6]:t.length<5?-1:t[5]};X509.getPublicKeyHexArrayFromCertHex=function(n){var u=X509.getSubjectPublicKeyPosFromCertHex(n),t=ASN1HEX.getPosArrayOfChildren_AtObj(n,u),i,r;return t.length!=2?[]:(i=ASN1HEX.getHexOfV_AtObj(n,t[0]),r=ASN1HEX.getHexOfV_AtObj(n,t[1]),i!=null&&r!=null?[i,r]:[])};X509.getHexTbsCertificateFromCert=function(n){return ASN1HEX.getStartPosOfV_AtObj(n,0)};X509.getPublicKeyHexArrayFromCertPEM=function(n){var t=X509.pemToHex(n);return X509.getPublicKeyHexArrayFromCertHex(t)};X509.hex2dn=function(n){for(var u,t="",r=ASN1HEX.getPosArrayOfChildren_AtObj(n,0),i=0;i<r.length;i++)u=ASN1HEX.getHexOfTLV_AtObj(n,r[i]),t=t+"/"+X509.hex2rdn(u);return t};X509.hex2rdn=function(n){var r=ASN1HEX.getDecendantHexTLVByNthList(n,0,[0,0]),t=ASN1HEX.getDecendantHexVByNthList(n,0,[0,1]),i="",u;try{i=X509.DN_ATTRHEX[r]}catch(f){i=r}return t=t.replace(/(..)/g,"%$1"),u=decodeURIComponent(t),i+"="+u};X509.DN_ATTRHEX={"0603550406":"C","060355040a":"O","060355040b":"OU","0603550403":"CN","0603550405":"SN","0603550408":"ST","0603550407":"L"};X509.getPublicKeyFromCertPEM=function(n){var t=X509.getPublicKeyInfoPropOfCertPEM(n),r,f,i;if(t.algoid=="2a864886f70d010101")return r=KEYUTIL.parsePublicRawRSAKeyHex(t.keyhex),i=new RSAKey,i.setPublic(r.n,r.e),i;if(t.algoid=="2a8648ce3d0201")return f=KJUR.crypto.OID.oidhex2name[t.algparam],i=new KJUR.crypto.ECDSA({curve:f,info:t.keyhex}),i.setPublicKeyHex(t.keyhex),i;if(t.algoid=="2a8648ce380401"){var e=ASN1HEX.getVbyList(t.algparam,0,[0],"02"),o=ASN1HEX.getVbyList(t.algparam,0,[1],"02"),s=ASN1HEX.getVbyList(t.algparam,0,[2],"02"),u=ASN1HEX.getHexOfV_AtObj(t.keyhex,0);return u=u.substr(2),i=new KJUR.crypto.DSA,i.setPublic(new BigInteger(e,16),new BigInteger(o,16),new BigInteger(s,16),new BigInteger(u,16)),i}throw"unsupported key";};X509.getPublicKeyInfoPropOfCertPEM=function(n){var r={},t,f,e,u,i,o;if(r.algparam=null,t=X509.pemToHex(n),f=ASN1HEX.getPosArrayOfChildren_AtObj(t,0),f.length!=3)throw"malformed X.509 certificate PEM (code:001)";if(t.substr(f[0],2)!="30")throw"malformed X.509 certificate PEM (code:002)";if(e=ASN1HEX.getPosArrayOfChildren_AtObj(t,f[0]),e.length<7)throw"malformed X.509 certificate PEM (code:003)";if(u=ASN1HEX.getPosArrayOfChildren_AtObj(t,e[6]),u.length!=2)throw"malformed X.509 certificate PEM (code:004)";if(i=ASN1HEX.getPosArrayOfChildren_AtObj(t,u[0]),i.length!=2)throw"malformed X.509 certificate PEM (code:005)";if(r.algoid=ASN1HEX.getHexOfV_AtObj(t,i[0]),t.substr(i[1],2)=="06"?r.algparam=ASN1HEX.getHexOfV_AtObj(t,i[1]):t.substr(i[1],2)=="30"&&(r.algparam=ASN1HEX.getHexOfTLV_AtObj(t,i[1])),t.substr(u[1],2)!="03")throw"malformed X.509 certificate PEM (code:006)";return o=ASN1HEX.getHexOfV_AtObj(t,u[1]),r.keyhex=o.substr(2),r};typeof KJUR!="undefined"&&KJUR||(KJUR={});typeof KJUR.crypto!="undefined"&&KJUR.crypto||(KJUR.crypto={});KJUR.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"};this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa"};this.CRYPTOJSMESSAGEDIGESTNAME={md5:"CryptoJS.algo.MD5",sha1:"CryptoJS.algo.SHA1",sha224:"CryptoJS.algo.SHA224",sha256:"CryptoJS.algo.SHA256",sha384:"CryptoJS.algo.SHA384",sha512:"CryptoJS.algo.SHA512",ripemd160:"CryptoJS.algo.RIPEMD160"};this.getDigestInfoHex=function(n,t){if(typeof this.DIGESTINFOHEAD[t]=="undefined")throw"alg not supported in Util.DIGESTINFOHEAD: "+t;return this.DIGESTINFOHEAD[t]+n};this.getPaddedDigestInfoHex=function(n,t,i){var u=this.getDigestInfoHex(n,t),f=i/4,r;if(u.length+22>f)throw"key is too short for SigAlg: keylen="+i+","+t;var e="0001",o="00"+u,s="",h=f-e.length-o.length;for(r=0;r<h;r+=2)s+="ff";return e+s+o};this.hashString=function(n,t){var i=new KJUR.crypto.MessageDigest({alg:t});return i.digestString(n)};this.hashHex=function(n,t){var i=new KJUR.crypto.MessageDigest({alg:t});return i.digestHex(n)};this.sha1=function(n){var t=new KJUR.crypto.MessageDigest({alg:"sha1",prov:"cryptojs"});return t.digestString(n)};this.sha256=function(n){var t=new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"});return t.digestString(n)};this.sha256Hex=function(n){var t=new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"});return t.digestHex(n)};this.sha512=function(n){var t=new KJUR.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"});return t.digestString(n)};this.sha512Hex=function(n){var t=new KJUR.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"});return t.digestHex(n)};this.md5=function(n){var t=new KJUR.crypto.MessageDigest({alg:"md5",prov:"cryptojs"});return t.digestString(n)};this.ripemd160=function(n){var t=new KJUR.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"});return t.digestString(n)};this.getCryptoJSMDByName=function(){}};KJUR.crypto.MessageDigest=function(n){this.setAlgAndProvider=function(alg,prov){if(alg!=null&&prov===undefined&&(prov=KJUR.crypto.Util.DEFAULTPROVIDER[alg]),":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(alg)!=-1&&prov=="cryptojs"){try{this.md=eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[alg]).create()}catch(ex){throw"setAlgAndProvider hash alg set fail alg="+alg+"/"+ex;}this.updateString=function(n){this.md.update(n)};this.updateHex=function(n){var t=CryptoJS.enc.Hex.parse(n);this.md.update(t)};this.digest=function(){var n=this.md.finalize();return n.toString(CryptoJS.enc.Hex)};this.digestString=function(n){return this.updateString(n),this.digest()};this.digestHex=function(n){return this.updateHex(n),this.digest()}}if(":sha256:".indexOf(alg)!=-1&&prov=="sjcl"){try{this.md=new sjcl.hash.sha256}catch(ex){throw"setAlgAndProvider hash alg set fail alg="+alg+"/"+ex;}this.updateString=function(n){this.md.update(n)};this.updateHex=function(n){var t=sjcl.codec.hex.toBits(n);this.md.update(t)};this.digest=function(){var n=this.md.finalize();return sjcl.codec.hex.fromBits(n)};this.digestString=function(n){return this.updateString(n),this.digest()};this.digestHex=function(n){return this.updateHex(n),this.digest()}}};this.updateString=function(){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.updateHex=function(){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestString=function(){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestHex=function(){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;};n!==undefined&&n.alg!==undefined&&(this.algName=n.alg,n.prov===undefined&&(this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName))};KJUR.crypto.Mac=function(n){this.setAlgAndProvider=function(alg,prov){var hashAlg,mdObj;if(alg==null&&(alg="hmacsha1"),alg=alg.toLowerCase(),alg.substr(0,4)!="hmac")throw"setAlgAndProvider unsupported HMAC alg: "+alg;if(prov===undefined&&(prov=KJUR.crypto.Util.DEFAULTPROVIDER[alg]),this.algProv=alg+"/"+prov,hashAlg=alg.substr(4),":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(hashAlg)!=-1&&prov=="cryptojs"){try{mdObj=eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[hashAlg]);this.mac=CryptoJS.algo.HMAC.create(mdObj,this.pass)}catch(ex){throw"setAlgAndProvider hash alg set fail hashAlg="+hashAlg+"/"+ex;}this.updateString=function(n){this.mac.update(n)};this.updateHex=function(n){var t=CryptoJS.enc.Hex.parse(n);this.mac.update(t)};this.doFinal=function(){var n=this.mac.finalize();return n.toString(CryptoJS.enc.Hex)};this.doFinalString=function(n){return this.updateString(n),this.doFinal()};this.doFinalHex=function(n){return this.updateHex(n),this.doFinal()}}};this.updateString=function(){throw"updateString(str) not supported for this alg/prov: "+this.algProv;};this.updateHex=function(){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv;};this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv;};this.doFinalString=function(){throw"digestString(str) not supported for this alg/prov: "+this.algProv;};this.doFinalHex=function(){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv;};n!==undefined&&(n.pass!==undefined&&(this.pass=n.pass),n.alg!==undefined&&(this.algName=n.alg,n.prov===undefined&&(this.provName=KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName)))};KJUR.crypto.Signature=function(n){var t=null;if(this._setAlgNames=function(){this.algName.match(/^(.+)with(.+)$/)&&(this.mdAlgName=RegExp.$1.toLowerCase(),this.pubkeyAlgName=RegExp.$2.toLowerCase())},this._zeroPaddingOfSignature=function(n,t){for(var i="",u=t/4-n.length,r=0;r<u;r++)i=i+"0";return i+n},this.setAlgAndProvider=function(n,t){if(this._setAlgNames(),t!="cryptojs/jsrsa")throw"provider not supported: "+t;if(":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)!=-1){try{this.md=new KJUR.crypto.MessageDigest({alg:this.mdAlgName})}catch(i){throw"setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+i;}this.init=function(n,t){var i=null;try{i=t===undefined?KEYUTIL.getKey(n):KEYUTIL.getKey(n,t)}catch(r){throw"init failed:"+r;}if(i.isPrivate===!0)this.prvKey=i,this.state="SIGN";else if(i.isPublic===!0)this.pubKey=i,this.state="VERIFY";else throw"init failed.:"+i;};this.initSign=function(n){typeof n.ecprvhex=="string"&&typeof n.eccurvename=="string"?(this.ecprvhex=n.ecprvhex,this.eccurvename=n.eccurvename):this.prvKey=n;this.state="SIGN"};this.initVerifyByPublicKey=function(n){typeof n.ecpubhex=="string"&&typeof n.eccurvename=="string"?(this.ecpubhex=n.ecpubhex,this.eccurvename=n.eccurvename):n instanceof KJUR.crypto.ECDSA?this.pubKey=n:n instanceof RSAKey&&(this.pubKey=n);this.state="VERIFY"};this.initVerifyByCertificatePEM=function(n){var t=new X509;t.readCertPEM(n);this.pubKey=t.subjectPublicKeyRSA;this.state="VERIFY"};this.updateString=function(n){this.md.updateString(n)};this.updateHex=function(n){this.md.updateHex(n)};this.sign=function(){if(this.sHashHex=this.md.digest(),typeof this.ecprvhex!="undefined"&&typeof this.eccurvename!="undefined"){var n=new KJUR.crypto.ECDSA({curve:this.eccurvename});this.hSign=n.signHex(this.sHashHex,this.ecprvhex)}else if(this.pubkeyAlgName=="rsaandmgf1")this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);else if(this.pubkeyAlgName=="rsa")this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);else if(this.prvKey instanceof KJUR.crypto.ECDSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else if(this.prvKey instanceof KJUR.crypto.DSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else throw"Signature: unsupported public key alg: "+this.pubkeyAlgName;return this.hSign};this.signString=function(n){return this.updateString(n),this.sign()};this.signHex=function(n){return this.updateHex(n),this.sign()};this.verify=function(n){if(this.sHashHex=this.md.digest(),typeof this.ecpubhex!="undefined"&&typeof this.eccurvename!="undefined"){var t=new KJUR.crypto.ECDSA({curve:this.eccurvename});return t.verifyHex(this.sHashHex,n,this.ecpubhex)}if(this.pubkeyAlgName=="rsaandmgf1")return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,n,this.mdAlgName,this.pssSaltLen);if(this.pubkeyAlgName=="rsa"||this.pubKey instanceof KJUR.crypto.ECDSA||this.pubKey instanceof KJUR.crypto.DSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,n);throw"Signature: unsupported public key alg: "+this.pubkeyAlgName;}}},this.init=function(){throw"init(key, pass) not supported for this alg:prov="+this.algProvName;},this.initVerifyByPublicKey=function(){throw"initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov="+this.algProvName;},this.initVerifyByCertificatePEM=function(){throw"initVerifyByCertificatePEM(certPEM) not supported for this alg:prov="+this.algProvName;},this.initSign=function(){throw"initSign(prvKey) not supported for this alg:prov="+this.algProvName;},this.updateString=function(){throw"updateString(str) not supported for this alg:prov="+this.algProvName;},this.updateHex=function(){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName;},this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName;},this.signString=function(){throw"digestString(str) not supported for this alg:prov="+this.algProvName;},this.signHex=function(){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName;},this.verify=function(){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName;},this.initParams=n,n!==undefined&&(n.alg!==undefined&&(this.algName=n.alg,this.provName=n.prov===undefined?KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]:n.prov,this.algProvName=this.algName+":"+this.provName,this.setAlgAndProvider(this.algName,this.provName),this._setAlgNames()),n.psssaltlen!==undefined&&(this.pssSaltLen=n.psssaltlen),n.prvkeypem!==undefined))if(n.prvkeypas!==undefined)throw"both prvkeypem and prvkeypas parameters not supported";else try{t=new RSAKey;t.readPrivateKeyFromPEMString(n.prvkeypem);this.initSign(t)}catch(i){throw"fatal error to load pem private key: "+i;}};KJUR.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA"}};typeof Buffer=="function"?(utf8tob64u=function(n){return b64tob64u(new Buffer(n,"utf8").toString("base64"))},b64utoutf8=function(n){return new Buffer(b64utob64(n),"base64").toString("utf8")}):(utf8tob64u=function(n){return hextob64u(uricmptohex(encodeURIComponentAll(n)))},b64utoutf8=function(n){return decodeURIComponent(hextouricmp(b64utohex(n)))});
///#source 1 1 json-sans-eval.min.js
var jsonParse=function(){function r(n,t,r){return t?i[t]:String.fromCharCode(parseInt(r,16))}var n=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),t=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),i={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},u=new String(""),f="\\",o={"{":Object,"[":Array},e=Object.hasOwnProperty;return function(i,o){var y=i.match(n),a,l=y[0],p=!1,h,c,v,b,s,w;for("{"===l?a={}:"["===l?a=[]:(a=[],p=!0),c=[a],v=1-p,b=y.length;v<b;++v){l=y[v];switch(l.charCodeAt(0)){default:s=c[0];s[h||s.length]=+l;h=void 0;break;case 34:if(l=l.substring(1,l.length-1),l.indexOf(f)!==-1&&(l=l.replace(t,r)),s=c[0],!h)if(s instanceof Array)h=s.length;else{h=l||u;break}s[h]=l;h=void 0;break;case 91:s=c[0];c.unshift(s[h||s.length]=[]);h=void 0;break;case 93:c.shift();break;case 102:s=c[0];s[h||s.length]=!1;h=void 0;break;case 110:s=c[0];s[h||s.length]=null;h=void 0;break;case 116:s=c[0];s[h||s.length]=!0;h=void 0;break;case 123:s=c[0];c.unshift(s[h||s.length]={});h=void 0;break;case 125:c.shift()}}if(p){if(c.length!==1)throw new Error;a=a[0]}else if(c.length)throw new Error;return o&&(w=function(n,t){var i=n[t],r,u,f,s;if(i&&typeof i=="object"){r=null;for(u in i)e.call(i,u)&&i!==n&&(f=w(i,u),f!==void 0?i[u]=f:(r||(r=[]),r.push(u)));if(r)for(s=r.length;--s>=0;)delete i[r[s]]}return o.call(n,t,i)},a=w({"":a},"")),a}}();
///#source 1 1 jws-3.0.min.js
if(typeof KJUR=="undefined"||!KJUR){KJUR={}}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={}}KJUR.jws.JWS=function(){this.parseJWS=function(m,o){if((this.parsedJWS!==undefined)&&(o||(this.parsedJWS.sigvalH!==undefined))){return}if(m.match(/^([^.]+)\.([^.]+)\.([^.]+)$/)==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}var p=RegExp.$1;var k=RegExp.$2;var q=RegExp.$3;var s=p+"."+k;this.parsedJWS={};this.parsedJWS.headB64U=p;this.parsedJWS.payloadB64U=k;this.parsedJWS.sigvalB64U=q;this.parsedJWS.si=s;if(!o){var n=b64utohex(q);var l=parseBigInt(n,16);this.parsedJWS.sigvalH=n;this.parsedJWS.sigvalBI=l}var j=b64utoutf8(p);var r=b64utoutf8(k);this.parsedJWS.headS=j;this.parsedJWS.payloadS=r;if(!KJUR.jws.JWS.isSafeJSONString(j,this.parsedJWS,"headP")){throw"malformed JSON string for JWS Head: "+j}};function a(k,j){return utf8tob64u(k)+"."+utf8tob64u(j)}function e(l,k){var j=function(m){return KJUR.crypto.Util.hashString(m,k)};if(j==null){throw"hash function not defined in jsrsasign: "+k}return j(l)}function g(p,m,j,n,l){var o=a(p,m);var k=parseBigInt(j,16);return _rsasign_verifySignatureWithArgs(o,k,n,l)}this.verifyJWSByNE=function(l,k,j){this.parseJWS(l);return _rsasign_verifySignatureWithArgs(this.parsedJWS.si,this.parsedJWS.sigvalBI,k,j)};this.verifyJWSByKey=function(m,l){this.parseJWS(m);var j=b(this.parsedJWS.headP);var k=this.parsedJWS.headP.alg.substr(0,2)=="PS";if(l.hashAndVerify){return l.hashAndVerify(j,new Buffer(this.parsedJWS.si,"utf8").toString("base64"),b64utob64(this.parsedJWS.sigvalB64U),"base64",k)}else{if(k){return l.verifyStringPSS(this.parsedJWS.si,this.parsedJWS.sigvalH,j)}else{return l.verifyString(this.parsedJWS.si,this.parsedJWS.sigvalH)}}};this.verifyJWSByPemX509Cert=function(l,j){this.parseJWS(l);var k=new X509();k.readCertPEM(j);return k.subjectPublicKeyRSA.verifyString(this.parsedJWS.si,this.parsedJWS.sigvalH)};function b(k){var l=k.alg;var j="";if(l!="RS256"&&l!="RS512"&&l!="PS256"&&l!="PS512"){throw"JWS signature algorithm not supported: "+l}if(l.substr(2)=="256"){j="sha256"}if(l.substr(2)=="512"){j="sha512"}return j}function d(j){return b(jsonParse(j))}function i(j,o,r,l,p,q){var m=new RSAKey();m.setPrivate(l,p,q);var k=d(j);var n=m.signString(r,k);return n}function h(p,o,n,m,l){var j=null;if(typeof l=="undefined"){j=d(p)}else{j=b(l)}var k=l.alg.substr(0,2)=="PS";if(m.hashAndSign){return b64tob64u(m.hashAndSign(j,n,"binary","base64",k))}else{if(k){return hextob64u(m.signStringPSS(n,j))}else{return hextob64u(m.signString(n,j))}}}function f(o,l,n,k,m){var j=a(o,l);return i(o,l,j,n,k,m)}this.generateJWSByNED=function(q,m,p,l,o){if(!KJUR.jws.JWS.isSafeJSONString(q)){throw"JWS Head is not safe JSON string: "+q}var k=a(q,m);var n=i(q,m,k,p,l,o);var j=hextob64u(n);this.parsedJWS={};this.parsedJWS.headB64U=k.split(".")[0];this.parsedJWS.payloadB64U=k.split(".")[1];this.parsedJWS.sigvalB64U=j;return k+"."+j};this.generateJWSByKey=function(o,m,j){var n={};if(!KJUR.jws.JWS.isSafeJSONString(o,n,"headP")){throw"JWS Head is not safe JSON string: "+o}var l=a(o,m);var k=h(o,m,l,j,n.headP);this.parsedJWS={};this.parsedJWS.headB64U=l.split(".")[0];this.parsedJWS.payloadB64U=l.split(".")[1];this.parsedJWS.sigvalB64U=k;return l+"."+k};function c(p,o,n,k){var m=new RSAKey();m.readPrivateKeyFromPEMString(k);var j=d(p);var l=m.signString(n,j);return l}this.generateJWSByP1PrvKey=function(o,m,j){if(!KJUR.jws.JWS.isSafeJSONString(o)){throw"JWS Head is not safe JSON string: "+o}var l=a(o,m);var n=c(o,m,l,j);var k=hextob64u(n);this.parsedJWS={};this.parsedJWS.headB64U=l.split(".")[0];this.parsedJWS.payloadB64U=l.split(".")[1];this.parsedJWS.sigvalB64U=k;return l+"."+k}};KJUR.jws.JWS.sign=function(a,o,h,k,j){var i=KJUR.jws.JWS;if(!i.isSafeJSONString(o)){throw"JWS Head is not safe JSON string: "+sHead}var d=i.readSafeJSONString(o);if((a==""||a==null)&&d.alg!==undefined){a=d.alg}if((a!=""&&a!=null)&&d.alg===undefined){d.alg=a;o=JSON.stringify(d)}var c=null;if(i.jwsalg2sigalg[a]===undefined){throw"unsupported alg name: "+a}else{c=i.jwsalg2sigalg[a]}var b=utf8tob64u(o);var f=utf8tob64u(h);var m=b+"."+f;var l="";if(c.substr(0,4)=="Hmac"){if(k===undefined){throw"hexadecimal key shall be specified for HMAC"}var g=new KJUR.crypto.Mac({alg:c,pass:hextorstr(k)});g.updateString(m);l=g.doFinal()}else{if(c.indexOf("withECDSA")!=-1){var n=new KJUR.crypto.Signature({alg:c});n.init(k,j);n.updateString(m);hASN1Sig=n.sign();l=KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig)}else{if(c!="none"){var n=new KJUR.crypto.Signature({alg:c});n.init(k,j);n.updateString(m);l=n.sign()}}}var e=hextob64u(l);return m+"."+e};KJUR.jws.JWS.verify=function(d,m){var k=KJUR.jws.JWS;var l=d.split(".");var c=l[0];var h=l[1];var o=c+"."+h;var n=b64utohex(l[2]);var f=k.readSafeJSONString(b64utoutf8(l[0]));var b=null;if(f.alg===undefined){throw"algorithm not specified in header"}else{b=f.alg}var e=null;if(k.jwsalg2sigalg[f.alg]===undefined){throw"unsupported alg name: "+b}else{e=k.jwsalg2sigalg[b]}if(e=="none"){return true}else{if(e.substr(0,4)=="Hmac"){if(m===undefined){throw"hexadecimal key shall be specified for HMAC"}var j=new KJUR.crypto.Mac({alg:e,pass:hextorstr(m)});j.updateString(o);hSig2=j.doFinal();return n==hSig2}else{if(e.indexOf("withECDSA")!=-1){var g=null;try{g=KJUR.crypto.ECDSA.concatSigToASN1Sig(n)}catch(i){return false}var p=new KJUR.crypto.Signature({alg:e});p.init(m);p.updateString(o);return p.verify(g)}else{var p=new KJUR.crypto.Signature({alg:e});p.init(m);p.updateString(o);return p.verify(n)}}}};KJUR.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none",};KJUR.jws.JWS.isSafeJSONString=function(c,b,d){var e=null;try{e=jsonParse(c);if(typeof e!="object"){return 0}if(e.constructor===Array){return 0}if(b){b[d]=e}return 1}catch(a){return 0}};KJUR.jws.JWS.readSafeJSONString=function(b){var c=null;try{c=jsonParse(b);if(typeof c!="object"){return null}if(c.constructor===Array){return null}return c}catch(a){return null}};KJUR.jws.JWS.getEncodedSignatureValueFromJWS=function(a){if(a.match(/^[^.]+\.[^.]+\.([^.]+)$/)==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}return RegExp.$1};

 if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str) {
            return this.slice(0, str.length) == str;
        }; 
    };

    if (typeof String.prototype.capitalize != 'function') {
        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
    };
    
    if (typeof String.prototype.contains != 'function') {
        String.prototype.contains = function (str) {
            return this.indexOf(str) > -1;
        }
    };


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