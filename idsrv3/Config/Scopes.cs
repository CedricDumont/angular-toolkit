using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityServer.Core.Models;

namespace idsrv3.Config
{
    static class Scopes
    {
        public static List<Scope> Get()
        {
            List<Scope> scopes = new List<Scope>();

            scopes.AddRange(StandardScopes.All);
            scopes.Add(new Scope
                {
                    Name = "api1",
                    DisplayName = "some scope",
                    Emphasize = true,
                    ShowInDiscoveryDocument = true,
                    Type = ScopeType.Resource

                });

            return scopes;
        }
    }
}
