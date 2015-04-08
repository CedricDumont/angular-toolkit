﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityServer.Core.Models;

namespace idsrv3.Config
{
    static class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "MyApp",
                    ClientId = "MyAppClientId",
                    Enabled = true,
                    AccessTokenType = AccessTokenType.Reference,

                    Flow = Flows.ResourceOwner,
                    ClientSecrets = new List<ClientSecret>
                    {
                        new ClientSecret("21B5F798-BE55-42BC-8AA8-0025B903DC3B".Sha256())
                    }
                },

                new Client
                {
                    ClientName = "Implicit Client",
                    Enabled = true,

                    ClientId = "implicitclient",
                    ClientSecrets = new List<ClientSecret>
                    { 
                        new ClientSecret("secret".Sha256())
                    },

                    Flow = Flows.Implicit,

                   // AllowedCorsOrigins = new List<String>(){"*"},
                    
                    ClientUri = "http://www.example.com",
                    
                   
                    RequireConsent = true,
                    AllowRememberConsent = true,

                    RedirectUris = new List<string>
                    {
                        
                        "http://localhost:8000/demoApp/index.html#/openid-redirect/"
                                             
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:8000/demoApp/index.html/"
                    },

                

                    IdentityTokenLifetime = 360,
                    AccessTokenLifetime = 3600
                },
            };
        }
    }
}
