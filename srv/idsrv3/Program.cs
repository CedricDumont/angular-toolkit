using idsrv3.Config;
using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityModel.Client;
using Thinktecture.IdentityServer.Core.Logging;

namespace idsrv3
{
    class Program
    {

        public static byte[] Decode(string arg)
        {
            Console.WriteLine(arg);
            string s = arg;
            s = s.Replace('-', '+'); // 62nd char of encoding
            s = s.Replace('_', '/'); // 63rd char of encoding

            switch (s.Length % 4) // Pad with trailing '='s
            {
                case 0: break; // No pad chars in this case
                case 2: s += "=="; break; // Two pad chars
                case 3: s += "="; break; // One pad char
                default: throw new Exception("Illegal base64url string!");
            }

            Console.WriteLine(s);

            return Convert.FromBase64String(s); // Standard base64 decoder
        }


        static void Main(string[] args)
        {
            //&post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A8000%2FdemoApp%2Findex.html
            // var test = Decode("id_token_hint=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJub25jZSI6ImUyMmYxNmJkLWE1Y2ItNDU4OC05ODAyLWViMDgyMTVmOTIzYyIsImlhdCI6MTQyNzQ2MjA0MywiYXRfaGFzaCI6Ing2NkJUWE9UTE1nVGhjWnlfWk40eUEiLCJzdWIiOiJJIGFtIHRoZSBTdWJqZWN0IiwiYW1yIjoicGFzc3dvcmQiLCJhdXRoX3RpbWUiOjE0Mjc0NjEwODksImlkcCI6Imlkc3J2IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzMiLCJhdWQiOiJpbXBsaWNpdGNsaWVudCIsImV4cCI6MTQyNzQ2MjQwMywibmJmIjoxNDI3NDYyMDQzfQ.Up9N0JUcxYih-E8sTV8eHyUnWGwTJewwu73gy5nbyIx8IW5xAzbdGWK4yGXmR1uPoKeaE7EOa5kXHcPHbFWSmnoLwTwZTbakmH-hMPtcUEOa1FGpKLuurjH7-5gy30eacEPKSFuZyE_6AzTOVm30SEQommkmu1oqBoUu7mOKVSOGvNRGbfK479yLaLeuFUmObpMWkq6Cvo_DeyoTlha6G030yfu6VBW7gsg0bUgZy5FQihdCXl46IA8-57GeTqXsGG6F0xn2RZ-9vee6XMBDdN5bfNgKN7JjghoEVOKxu647ht2pynI4zOCVP8cAdMPBaSWGykKeJE5k3UZWLmPoNw");
            //var test = Decode("http%3A%2F%2Flocalhost%3A8000%2FdemoApp%2Findex.html");
            //var test = Decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJub25jZSI6ImUyMmYxNmJkLWE1Y2ItNDU4OC05ODAyLWViMDgyMTVmOTIzYyIsImlhdCI6MTQyNzQ2MjA0MywiYXRfaGFzaCI6Ing2NkJUWE9UTE1nVGhjWnlfWk40eUEiLCJzdWIiOiJJIGFtIHRoZSBTdWJqZWN0IiwiYW1yIjoicGFzc3dvcmQiLCJhdXRoX3RpbWUiOjE0Mjc0NjEwODksImlkcCI6Imlkc3J2IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzMiLCJhdWQiOiJpbXBsaWNpdGNsaWVudCIsImV4cCI6MTQyNzQ2MjQwMywibmJmIjoxNDI3NDYyMDQzfQ.Up9N0JUcxYih-E8sTV8eHyUnWGwTJewwu73gy5nbyIx8IW5xAzbdGWK4yGXmR1uPoKeaE7EOa5kXHcPHbFWSmnoLwTwZTbakmH-hMPtcUEOa1FGpKLuurjH7-5gy30eacEPKSFuZyE_6AzTOVm30SEQommkmu1oqBoUu7mOKVSOGvNRGbfK479yLaLeuFUmObpMWkq6Cvo_DeyoTlha6G030yfu6VBW7gsg0bUgZy5FQihdCXl46IA8-57GeTqXsGG6F0xn2RZ-9vee6XMBDdN5bfNgKN7JjghoEVOKxu647ht2pynI4zOCVP8cAdMPBaSWGykKeJE5k3UZWLmPoNw");

            //Console.WriteLine(test.Length);

            //Console.ReadLine();
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
