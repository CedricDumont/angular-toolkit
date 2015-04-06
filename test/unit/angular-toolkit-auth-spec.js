/* jshint ignore:start */
describe('angular-toolkit-auth >', function () {

    var _$httpBackend;
    var sandbox;

    //generic method to watch failing promise
    var testFail = function (err) {
        fail();
    };

    var urlHelper = new URLHelper();

    // ThinkTecture Identityserver test config
    var _TTOpenIdDiscoveryFile = '{"issuer":"https://localhost:44333","jwks_uri":"https://localhost:44333/.well-known/jwks","authorization_endpoint":"https://localhost:44333/connect/authorize","token_endpoint":"https://localhost:44333/connect/token","userinfo_endpoint":"https://localhost:44333/connect/userinfo","end_session_endpoint":"https://localhost:44333/connect/endsession","check_session_iframe":"https://localhost:44333/connect/checksession","revocation_endpoint":"https://localhost:44333/connect/revocation","scopes_supported":["openid","profile","email","phone","address","api1"],"response_types_supported":["code","token","id_token","id_token token","code id_token","code token","code id_token token"],"response_modes_supported":["form_post","query","fragment"],"grant_types_supported":["authorization_code","client_credentials","password","refresh_token","implicit"],"subject_types_supported":["public"],"id_token_signing_alg_values_supported":["RS256"]}';

    var tt_jwks_response = '{"keys":[{"kty":"RSA","use":"sig","kid":"a3rMUgMFv9tPclLa6yF3zAkfquE","x5t":"a3rMUgMFv9tPclLa6yF3zAkfquE","e":"AQAB","n":"qnTksBdxOiOlsmRNd-mMS2M3o1IDpK4uAr0T4_YqO3zYHAGAWTwsq4ms-NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4_O-0ILAlXw8NU4-jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj-x6daOv5FmrHU1r9_bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFw","x5c":["MIIDBTCCAfGgAwIBAgIQNQb+T2ncIrNA6cKvUA1GWTAJBgUrDgMCHQUAMBIxEDAOBgNVBAMTB0RldlJvb3QwHhcNMTAwMTIwMjIwMDAwWhcNMjAwMTIwMjIwMDAwWjAVMRMwEQYDVQQDEwppZHNydjN0ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqnTksBdxOiOlsmRNd+mMS2M3o1IDpK4uAr0T4/YqO3zYHAGAWTwsq4ms+NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4/O+0ILAlXw8NU4+jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj+x6daOv5FmrHU1r9/bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFwIDAQABo1wwWjATBgNVHSUEDDAKBggrBgEFBQcDATBDBgNVHQEEPDA6gBDSFgDaV+Q2d2191r6A38tBoRQwEjEQMA4GA1UEAxMHRGV2Um9vdIIQLFk7exPNg41NRNaeNu0I9jAJBgUrDgMCHQUAA4IBAQBUnMSZxY5xosMEW6Mz4WEAjNoNv2QvqNmk23RMZGMgr516ROeWS5D3RlTNyU8FkstNCC4maDM3E0Bi4bbzW3AwrpbluqtcyMN3Pivqdxx+zKWKiORJqqLIvN8CT1fVPxxXb/e9GOdaR8eXSmB0PgNUhM4IjgNkwBbvWC9F/lzvwjlQgciR7d4GfXPYsE1vf8tmdQaY8/PtdAkExmbrb9MihdggSoGXlELrPA91Yce+fiRcKY3rQlNWVd4DOoJ/cPXsXwry8pWjNCo5JD8Q+RQ5yZEy7YPoifwemLhTdsBz3hlZr28oCGJ3kbnpW0xGvQb3VHSTVVbeei0CfXoW6iz1"]}]}';

    var google_jwks_response = '{keys:[{kty:"RSA",alg:"RS256",use:"sig",kid:"de95593a55348d6f43d999e8014ade3f20e54982",n:"7pWc6CbDP_DQ2slLRP3TAtJ9bJ2YxZHq1_GmvVUIM0y6uUckm39dk6Wkez5P5WwEH5XS5eUAuXG7l5Wb6lg6NCLq5-DoYErbA8tlNOe2wT4WkEASCamDyZr7U4bTkYuk3nXZtbpIY5gNt7V0PTZrdzpPrJrGSjiexk02lgMiOD8=",e:"AQAB"},{kty:"RSA",alg:"RS256",use:"sig",kid:"84a5738e82f54b59ac5b77c319ed91ca7157b464",n:"pHz0_grev1C6S3uYVEbxdYQgP0SEVkk-2qxaXFWWylpn15bAVb8Mbjno2faawQPvubWN4-JARNOMTHkrq7Y8mmlN6SPxlVRWxXvoLWQVSx1FndNv4JQ7xeoBIm9bTwnsmFHYU7uM1g6v23whTQPk6ruo9u-sW2NRpThR30pCEGE=",e:"AQAB"}]};';

    var salesforce_jwks_response = '{keys:[{kty:"RSA",alg:"RS256",use:"sig",kid:"de95593a55348d6f43d999e8014ade3f20e54982",n:"7pWc6CbDP_DQ2slLRP3TAtJ9bJ2YxZHq1_GmvVUIM0y6uUckm39dk6Wkez5P5WwEH5XS5eUAuXG7l5Wb6lg6NCLq5-DoYErbA8tlNOe2wT4WkEASCamDyZr7U4bTkYuk3nXZtbpIY5gNt7V0PTZrdzpPrJrGSjiexk02lgMiOD8=",e:"AQAB"},{kty:"RSA",alg:"RS256",use:"sig",kid:"84a5738e82f54b59ac5b77c319ed91ca7157b464",n:"pHz0_grev1C6S3uYVEbxdYQgP0SEVkk-2qxaXFWWylpn15bAVb8Mbjno2faawQPvubWN4-JARNOMTHkrq7Y8mmlN6SPxlVRWxXvoLWQVSx1FndNv4JQ7xeoBIm9bTwnsmFHYU7uM1g6v23whTQPk6ruo9u-sW2NRpThR30pCEGE=",e:"AQAB"}]};';

    beforeEach(module('angular-toolkit-auth'));

    beforeEach(module('angular-toolkit-auth-config'));

    beforeEach(inject(function ($httpBackend, openId) { // need to inject openId so that it's bootsrapped

        _$httpBackend = $httpBackend;

        _$httpBackend.when('GET', 'https://localhost:44333/.well-known/openid-configuration').respond(_TTOpenIdDiscoveryFile);
        _$httpBackend.when('GET', 'https://localhost:44333/.well-known/jwks').respond(tt_jwks_response);
        _$httpBackend.when('GET', 'https://www.googleapis.com/oauth2/v2/certs').respond(google_jwks_response);
        _$httpBackend.when('GET', 'https://login.salesforce.com/id/keys').respond(salesforce_jwks_response);

        _$httpBackend.flush();

    }));

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    // test the principal service
    describe('principal', function () {

        it('should have None as default authentication type', inject(function (principal) {
            expect(principal.identity.authenticationType).toBe('None');
        }));

    });

    //
    describe('openid configuration >', function () {

        var _googleConfig; // google config
        var _salesforceConfig; // salesforce config
        var _ttconfiguration; // thinktecture config

        beforeEach(
            inject(function (openId) {

                _ttconfiguration = openId.getConfiguration('https://localhost:44333');
                _googleConfig = openId.getConfiguration('accounts.google.com');
                _salesforceConfig = openId.getConfiguration('https://login.salesforce.com');

                expect(_ttconfiguration).toBeDefined();
                expect(_googleConfig).toBeDefined();
                expect(_ttconfiguration).toBeDefined();

            })
        );

        it('should Return different configuration for different providers', inject(function (openId) {
            expect(openId.getConfiguration('https://localhost:44333').issuer).toBe('https://localhost:44333');
            expect(openId.getConfiguration('accounts.google.com').issuer).toBe('accounts.google.com');
            expect(openId.getConfiguration('https://login.salesforce.com').issuer).toBe('https://login.salesforce.com');

            expect(_googleConfig.authorization_endpoint).toBe('https://accounts.google.com/o/oauth2/auth');
            expect(_ttconfiguration.authorization_endpoint).toBe('https://localhost:44333/connect/authorize');

        }));


        it('should test if a scope is supported', function () {

            expect(_ttconfiguration.isScopeSupported('openid')).toBe(true);

            expect(_ttconfiguration.isScopeSupported(null)).toBe(false);

            expect(_ttconfiguration.isScopeSupported('some cool scope')).toBe(false);

        });

        it('should save a state when getting the configuration', function () {

            var urlObject = _ttconfiguration.generateAuthorizeUrl(true);

            expect(_ttconfiguration.challengeState(urlObject.data.state)).toBeTruthy();

        });

        it('should contain required parameters for authorization url', function () {

            expect(_ttconfiguration.generateAuthorizeUrl(true).data.state).toBeDefined();
            expect(_ttconfiguration.generateAuthorizeUrl(true).data.scope).toBeDefined();
            expect(_ttconfiguration.generateAuthorizeUrl(true).data.redirect_uri).toBeDefined();
            expect(_ttconfiguration.generateAuthorizeUrl(true).data.client_id).toBeDefined();
            expect(_ttconfiguration.generateAuthorizeUrl(true).data.response_type).toBeDefined();


            expect(_googleConfig.generateAuthorizeUrl(true).data.state).toBeDefined();
            expect(_googleConfig.generateAuthorizeUrl(true).data.scope).toBeDefined();
            expect(_googleConfig.generateAuthorizeUrl(true).data.redirect_uri).toBeDefined();
            expect(_googleConfig.generateAuthorizeUrl(true).data.client_id).toBeDefined();
            expect(_googleConfig.generateAuthorizeUrl(true).data.response_type).toBeDefined();

        });

        it('should contain automatic created redirect uri', function () {
            var redirectUri = _ttconfiguration.generateAuthorizeUrl(true).data.redirect_uri;
            expect(redirectUri).toBeDefined();
            expect(redirectUri.startsWith('http://server')).toBeTruthy();
            expect(redirectUri.endsWith('/openid-redirect/')).toBeTruthy();

        });

        it('should contain overriden redirect uri', function () {
            var redirectUri = _googleConfig.generateAuthorizeUrl(true).data.redirect_uri;
            expect(redirectUri).toBeDefined();
            expect(redirectUri).toBe('http://localhost:8000/demoApp/callback.html');

        });

        it('should create a valid logout uri', function () {
            var logoutUtl = _ttconfiguration.generateLogoutUrl('myId', true);
            expect(logoutUtl).toBeDefined();
            expect(logoutUtl.url).toBe('https://localhost:44333/connect/endsession');
        });



    });

    // test the principal service
    describe('idTokenValidator', function () {

        it('should validate token', inject(function (idTokenValidator) {

            var fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJub25jZSI6ImM0MGMwZjgxLTU4NjQtNGQ4ZS1iNDNmLTU3NWJkNzI5YjQzMCIsImlhdCI6MTQyODA0NTMzOSwiYXRfaGFzaCI6IkhTUWNHZndwSWVVZ05EQWlwYjU0TmciLCJzdWIiOiJJIGFtIHRoZSBTdWJqZWN0IiwiYW1yIjoicGFzc3dvcmQiLCJhdXRoX3RpbWUiOjE0MjgwNDUzMzMsImlkcCI6Imlkc3J2IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzMiLCJhdWQiOiJpbXBsaWNpdGNsaWVudCIsImV4cCI6MTQyODA0NTY5OSwibmJmIjoxNDI4MDQ1MzM5fQ.DrdnWpFgLMBVtOYgvr46dOjaDkiclfYVVORiGxXMXgkhNRLVmXdcntxp8iJHowD8sJffjvVCVxlES6s01VwE5ePnIpVblOhbpyeY2WTOeomgvHykilmuUmQN85Am112r2CyUImiiLvSrlr3_vVGSF1xNr559Xe4FTvgomdT1r0SCgBPeFZv94r9k8LUHPckacsdxlUzltyqRLeO-rZwJ373zINvzaWLxAJhovZ6GUGlap977f6TcvRZZgdvD-0NKMGle_-jzVU_vay-XgVVEcd2cl-90EG7DT704XYFRuiYHuBfRH2mgi0m3Rv6FjbQ_yfclYlJV3HmatyrsGL83ag'; // jshint ignore:line
            idTokenValidator.validate(fakeToken);

        }));

        it('should retrieve certificates', inject(function (idTokenValidator) {
            var ttCert = idTokenValidator.getCert('https://localhost:44333');
            expect(ttCert.keys[0].kid).toBe('a3rMUgMFv9tPclLa6yF3zAkfquE');
        }));

    });

    describe('callback control', function () {

        it('should have callback template in cache with controller atOpenIdCallbackCtrl', inject(function ($templateCache) {
            var result = $templateCache.get('callback.html');
            expect(result).toContain('atOpenIdCallbackCtrl');
        }));

    });

    describe('auth', function () {

        it('should call handleResponse after login', inject(function (auth, httpUtils, $location) {

            var fakeResponse = 'http://localhost:1485/openid-redirect.html#state=8d96327b-1914-4ad2-9733-10bcaeb4d068&access_token=ya29.RQElXNTuOG2wdGUX1QkcEWCSjO9vG-lphlUDXxrpHFWdVihkPMRpZ53zzB2ehzA2SIDRhDmBxfPsLQ&token_type=Bearer&expires_in=3600&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc1YjEwY2U2NzZlOWVkNGQxMDg5YjcwYjk1NTdjMDZlOGMwYjgwMjgifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwic3ViIjoiMTA3NTc1MzI3NTkyMDQ2NTIxNTc5IiwiYXpwIjoiMTE2NjE2OTc5MDAwLWJ1MG10aHFkc2ZxZTdwbjc5NGVhbWh1Y2Y0Z3ZjMXQ2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibm9uY2UiOiJlMGE4MWQxZC0zNDNhLTRjOGQtODAwZi1hYTg2M2VkOGViN2YiLCJhdF9oYXNoIjoiWTU1UUtyQm9MY3I4bHJSUUxMX2U0USIsImF1ZCI6IjExNjYxNjk3OTAwMC1idTBtdGhxZHNmcWU3cG43OTRlYW1odWNmNGd2YzF0Ni5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlhdCI6MTQyNzY0MDMxMywiZXhwIjoxNDI3NjQ0MDkzfQ.RH3IfnWdO467VqlzvvYuZsrAz8RuYEYkbf_cawcGw_ea_XJ1jQ5QqNkH5u-e186rvsR1FB51TqqSfQXR7BKpEj-nrxVHJzPi6ag5qxvUcUgWLT-oqlZRxL9t8yLZYYpCDW0cUxTjySAew3uytncPTcvIK6dIjU54uTpGTDqEMrk&authuser=0&num_sessions=1&prompt=consent&session_state=606f573e624499f21af28d7fd3ac58c6b76baf8c..fe8c';

            //create the stubs
            sandbox.stub($location, 'absUrl', function () {
                return fakeResponse;
            });
            sandbox.stub(httpUtils, 'redirectBrowserTo', function () {
                auth.handleResponse();
            });

            //call login
            auth.login('accounts.google.com');

            expect(httpUtils.redirectBrowserTo).toHaveBeenCalledOnce();

        }));

        it('should handle google callback response', inject(function (auth, $location, httpUtils, principal) {

            var googleCallbackResponse = 'http://localhost:8000/demoApp/callback.html#/state=6371c713-1dd3-48fc-83b7-e0b7fae1b987&access_token=ya29.SgHW30MjzhPRLZxJ8IXTYaH_mP-yvqwunpDUEg7MhTflmTPQtAVyGREEEpy1m7hPgZqfDawB29_-KQ&token_type=Bearer&expires_in=3600&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4Mjg4ZTRmMTA2NzA3ZWI2OTkzMmY3NTRhNTk2MTQxYjllN2M3MDUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwic3ViIjoiMTA3NTc1MzI3NTkyMDQ2NTIxNTc5IiwiYXpwIjoiMTE2NjE2OTc5MDAwLWJ1MG10aHFkc2ZxZTdwbjc5NGVhbWh1Y2Y0Z3ZjMXQ2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibm9uY2UiOiI1MzQ3MTQxYS1lZDAwLTRmZDEtOWE2OS1kZTk1NTg5YjI1NTMiLCJhdF9oYXNoIjoiMV93b3hjd2ZRRHE0ek8xRHVyd1ZvZyIsImF1ZCI6IjExNjYxNjk3OTAwMC1idTBtdGhxZHNmcWU3cG43OTRlYW1odWNmNGd2YzF0Ni5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlhdCI6MTQyODA0ODEzMSwiZXhwIjoxNDI4MDUxNzYxfQ.VIOFEUoasg6mC2PLcUs9Hf-t69rXEeHfACkMG4MjEi9ATG4swSD7-aPheATPkS0iF0xjTswe_ZHo4mXigNWI56nTPXjKpsnKepTFj8YqRFsX-h-mYLt6YFWtDNkAoooG2NMdlxIkp2natiFpRDBlXBST6Fp6H_EhlAhZLmDlYUI&authuser=0&num_sessions=1&prompt=consent&session_state=3976e13ee67de531656ad0ef0312acd1a30792c1..107e';

            var googleProfileResp = '{ "sub": "107575327592046521579","name": "Cedric Dumont","given_name": "Cedric","family_name": "Dumont","profile": "https://plus.google.com/107575327592046521579", "picture": "https://lh6.googleusercontent.com/-5e2efSi8ync/AAAAAAAAAAI/AAAAAAAAAD8/cJ0KwIGu6Gc/photo.jpg", "gender": "male", "locale": "fr"}';


            //create the stubs
            sandbox.stub($location, 'absUrl', function () {
                return googleCallbackResponse;
            });
            var stub = sandbox.stub(httpUtils, 'redirectBrowserTo');
            _$httpBackend.when('GET', 'https://www.googleapis.com/oauth2/v3/userinfo').respond(googleProfileResp);

            //call the method
            auth.handleResponse();

            //flush the requests so that promises are resolved
            _$httpBackend.flush();

            //assert
            expect(httpUtils.redirectBrowserTo).toHaveBeenCalledOnce();
            expect(principal.identity.name).toBe('Cedric Dumont');


        }));


    });



});
/* jshint ignore:end */