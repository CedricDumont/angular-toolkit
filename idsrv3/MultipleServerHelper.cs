using idsrv3.Config;
using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace idsrv3
{
    public class MultipleServerHelper : IDisposable
    {
        private readonly IDisposable _authServer;

        private readonly IDisposable _apiServer;

        public MultipleServerHelper()
        {
            _authServer = WebApp.Start(Constants.AuthorizationUrl, app =>
            {
                // add a prop to identify this server in the Startup.cs
                app.Properties.Add("AuthServer", true); 
                var startup = new idsrv3.Startup();
                startup.Configuration(app);
            });

            _apiServer = WebApp.Start(Constants.ApiUrl, app =>
            {
                // add a prop to identify this server in the Startup.cs
                app.Properties.Add("ApiServer", true);
                var startup = new idsrv3.Startup();
                startup.Configuration(app);
            });
        }


        public void Dispose()
        {
            _authServer.Dispose();

            _apiServer.Dispose();
        }
    }
}
