using idsrv3.Config;
using System;
using System.Net.Http;
using Thinktecture.IdentityModel.Client;
using Thinktecture.IdentityServer.Core.Logging;

namespace idsrv3
{
    public class Program
    {
       

        static void Main(string[] args)
        {
           
            LogProvider.SetCurrentLogProvider(new DiagnosticsTraceLogProvider());

            using (new MultipleServerHelper())
            {
                Console.WriteLine("auth server running on : " + Constants.AuthorizationUrl);
                Console.WriteLine("api server running on : " + Constants.ApiUrl);
                Console.WriteLine("");
                Console.WriteLine("server running...");
                //TokenResponse testToken = GetUserToken();
                //Console.WriteLine("token test is : " + testToken.AccessToken);
                //Console.WriteLine("call api ");
                //Console.WriteLine(CallApi(testToken));

                Console.ReadLine();


            }
        }

        static TokenResponse GetUserToken()
        {
            var client = new OAuth2Client(
                new Uri(Constants.AuthorizationUrl + "/connect/token"),
                "MyAppClientId",
                "21B5F798-BE55-42BC-8AA8-0025B903DC3B");

            return client.RequestResourceOwnerPasswordAsync("testUser", "testPwd", "api1").Result;
        }

        static String CallApi(TokenResponse response)
        {
            var client = new HttpClient();
            client.SetBearerToken(response.AccessToken);

            return client.GetStringAsync(Constants.ApiUrl + "/test").Result;
        }
    }
}
