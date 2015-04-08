while I was in the process of creating a service to connect to openid provider, I wanted my angular service to get configured with the discovery document that an openid provider can expose to document all it's endpoint (for authentication, refresh token, jwks ...).  
Therefor, I was building my service with a running <a href="https://github.com/identityserver/IdentityServer3">identityserver v3 (Thinktecture)</a> and as I was on my machine, with my server..., I configured CORS to allow all origins. Everything went fine and I was happy...   
Then I wanted my service to use other openid provider (like goole, salesforce ...), so I went reading their doc and found the place to get the *openid dicovery document*, so I adapted my config to use that discovery document ... And there ... **BIM BAM BOO**, I came across CORS problems... WTF

after lot's of research and headache, i came to a solution that is working for me and I hope it will help others.

here is the problem : 

if you try to get the discovery document like so : 


     $http.get('https://accounts.google.com/.well-known/openid-configuration').then(
                function(data){
                    console.log('response');
                    console.log(data);
                }).catch(function(data){
                    //damned you will get here
                });
                
doing like the above, you will get this error (in chrome console) :

    XMLHttpRequest cannot load https://accounts.google.com/.well-known/openid-configuration. 
    No 'Access-Control-Allow-Origin' header is present on the requested resource. 
    Origin 'http://localhost:8000' is therefore not allowed access. The response had HTTP status code 405.
    
yes the usual CORS problem.

after this, I tried with jsonp... but as for some it worked in some browser, it didn't in chrome.


    $http.jsonp('https://accounts.google.com/.well-known/openid-configuration').then(
                function(data){
                    console.log('response');
                    console.log(data);
                }).catch(function(data){
                    console.log('error');
                    console.log(data);
                });
                
this leads to anothe error:

    Refused to execute script from 'https://accounts.google.com/.well-known/openid-configuration' 
    because its MIME type ('application/json') is not executable, and strict MIME type checking is enabled
    
after some other researches, and lot's of talks, I came to a solution :


     app.service('jsonpProxyRequestInterceptor',
        function JsonpProxyRequestInterceptor($log) {
        //$log('in interceptor');
            var callbackRx = /callback\((.+)\);/gm;
            this.request = function (config) {
                //https://accounts.google.com/.well-known/openid-configuration
                if (config.url === 'https://accounts.google.com/.well-known/openid-configuration' &&
                    config.method === 'GET') {
                    console.log('in routine proxy' + config.url);
                    var apiUrl = config.url;
                    config.url = 'https://accounts.google.com/.well-known/openid-configuration';
                    config.params = angular.extend({}, config.params || {}, {
                        url: apiUrl,
                        callback: 'callback'
                    });
                    config.transformResponse.unshift(function (data, headers) {
                        console.log(data);
                        var matched = callbackRx.exec(data);
                        return matched ? matched[1] : data;
                    });
                }
                return config;
            };
        });

    app.config(['$httpProvider', function configHttp($httpProvider) {
        $httpProvider.interceptors.push('jsonpProxyRequestInterceptor');
    }]);
    

    
    