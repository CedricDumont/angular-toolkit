using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Thinktecture.IdentityServer.Core.Configuration;
using idsrv3.Config;
using Thinktecture.IdentityServer.Core.Services.InMemory;
using System.Collections.Generic;
using Thinktecture.IdentityServer.AccessTokenValidation;
using System.Web.Http;


namespace idsrv3
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            if (app.Properties.ContainsKey("AuthServer"))
            {
                //
                //IDsrv3 Section
                //
                var factory = InMemoryFactory.Create(
                                    scopes: Scopes.Get(),
                                    clients: Clients.Get(),
                                    users: Users.Get());

                var options = new IdentityServerOptions
                {
                    Factory = factory
                };

                app.UseIdentityServer(options);
            }
            else if (app.Properties.ContainsKey("ApiServer"))
            {
                //
                // api section
                //
                app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
                {
                    Authority = Constants.AuthorizationUrl,
                    RequiredScopes = new[] { "api1" }
                });

                //configure web api
                var config = new HttpConfiguration();
                config.MapHttpAttributeRoutes();
                config.Filters.Add(new AuthorizeAttribute());
                app.UseWebApi(config);
            }

           
        }
    }
}
