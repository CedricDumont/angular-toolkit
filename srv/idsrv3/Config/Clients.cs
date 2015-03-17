using System;
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
                }
            };
        }
    }
}
