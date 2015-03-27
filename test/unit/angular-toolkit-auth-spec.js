/* jshint ignore:start */
describe('angular-toolkit-auth >', function () {

    var testFail = function (err) {
        fail();
    };

    var urlHelper = new URLHelper();

    var mockAuthEndPoint = 'https://localhost:44333';

    var _$httpBackend;

    beforeEach(module('angular-toolkit-auth', function (authProvider, openIdProvider) {
        authProvider.setAuthenticationType('Bearer');
        openIdProvider.setAuthorityEndpoint(mockAuthEndPoint);
    }));

    beforeEach(inject(function ($httpBackend) {
        _$httpBackend = $httpBackend;

    }));

    xdescribe('auth Service >', function () {

        describe('login method >', function () {
            it('should have endpoint configured', inject(function (auth) {
                expect(auth.endpoint()).toBe(mockTestEndpoint);
            }));

            it('current user should be logged in', inject(function (auth, principal, $httpBackend) {

                $httpBackend.when('POST', mockTestEndpoint).respond({
                    access_token: 'someFakeToken'
                });

                $httpBackend.when('GET', mockTestEndpoint).respond({
                    access_token: 'someFakeToken'
                });

                auth.login('testUserName', 'somePassword');

                $httpBackend.flush();

                expect(principal.identity.isAuthenticated).toBe(true);
            }));

            it('current user should be logged out', inject(function (auth, principal) {

                //from previous test
                expect(principal.identity.isAuthenticated).toBe(true);

                auth.logout();

                expect(principal.identity.isAuthenticated).toBe(false);
            }));

        });

    });

    describe('principal', function () {

        it('should have Bearer as authentication type', inject(function (principal) {
            expect(principal.identity.authenticationType).toBe('None');
        }));

    });

    describe('openid configuration >', function () {

        var _mockOpenIdDiscoveryFile = '{"issuer":"https://localhost:44333","jwks_uri":"https://localhost:44333/.well-known/jwks","authorization_endpoint":"https://localhost:44333/connect/authorize","token_endpoint":"https://localhost:44333/connect/token","userinfo_endpoint":"https://localhost:44333/connect/userinfo","end_session_endpoint":"https://localhost:44333/connect/endsession","check_session_iframe":"https://localhost:44333/connect/checksession","revocation_endpoint":"https://localhost:44333/connect/revocation","scopes_supported":["openid","profile","email","phone","address","api1"],"response_types_supported":["code","token","id_token","id_token token","code id_token","code token","code id_token token"],"response_modes_supported":["form_post","query","fragment"],"grant_types_supported":["authorization_code","client_credentials","password","refresh_token","implicit"],"subject_types_supported":["public"],"id_token_signing_alg_values_supported":["RS256"]}';

        var _configuration;

        beforeEach(
            inject(function (openId) {

                _$httpBackend.when('GET', 'https://localhost:44333/.well-known/openid-configuration').respond(_mockOpenIdDiscoveryFile);

                _$httpBackend.flush();

                _configuration = openId.getConfiguration();

            })
        );

        it('should contain required properties', function () {

            expect(_configuration.issuer).toBe('https://localhost:44333');
            expect(_configuration.authorization_endpoint).toBe('https://localhost:44333/connect/authorize');
            expect(_configuration.token_endpoint).toBe('https://localhost:44333/connect/token');
            expect(_configuration.end_session_endpoint).toBe('https://localhost:44333/connect/endsession');

        });

        it('should test if a scope is supported', function () {

            expect(_configuration.isScopeSupported('openid')).toBe(true);

            expect(_configuration.isScopeSupported(null)).toBe(false);

            expect(_configuration.isScopeSupported('some cool scope')).toBe(false);

        });

        it('should save a state when getting the configuration', function () {

            var urlObject = _configuration.generateAuthorizeUrl(true);

            expect(_configuration.challengeState(urlObject.data.state)).toBeTruthy();

        });

        it('should contain required parameters for authorization url', function () {

            expect(_configuration.generateAuthorizeUrl(true).data.state).toBeDefined();
            expect(_configuration.generateAuthorizeUrl(true).data.scope).toBeDefined();
            expect(_configuration.generateAuthorizeUrl(true).data.redirect_uri).toBeDefined();
            expect(_configuration.generateAuthorizeUrl(true).data.client_id).toBeDefined();
            expect(_configuration.generateAuthorizeUrl(true).data.response_type).toBeDefined();

        });

        it('should contain valid redirect uri', function () {
            var redirectUri = _configuration.generateAuthorizeUrl(true).data.redirect_uri
            expect(redirectUri).toBeDefined();
            expect(redirectUri.startsWith('http://server')).toBeTruthy();
            expect(redirectUri.endsWith('/openid-redirect/')).toBeTruthy();

        });
        
        it('should create a valid logout uri', function () {
            var logoutUtl = _configuration.generateLogoutUrl('myId', true);
            expect(logoutUtl).toBeDefined();
            expect(logoutUtl.url).toBe('https://localhost:44333/connect/endsession');
        });

    });

    describe('callback control', function () {

        it('should have callback template in cache', inject(function ($templateCache) {
            var result = $templateCache.get('callback.html');

            dump(result);
        }));

    });


});
/* jshint ignore:end */