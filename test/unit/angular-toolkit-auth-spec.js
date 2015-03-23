describe('angular-toolkit-auth >', function () {

    var mockTestEndpoint = 'https://fakeDomain:44333/connect/token';

    beforeEach(module('angular-toolkit-auth', function (authProvider) {
        authProvider.setTokenEndpoint(mockTestEndpoint);
        authProvider.setAuthenticationType('Bearer');
    }));

    describe('auth Service >', function () {

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
            expect(principal.identity.authenticationType).toBe('Bearer');
        }));

    });


});