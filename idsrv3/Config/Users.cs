using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityServer.Core.Services.InMemory;

namespace idsrv3.Config
{
    static class Users
    {
        public static List<InMemoryUser> Get()
        {
            return new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "testUser",
                    Password = "testPwd",
                    Subject = "I am the Subject"
                }
           
            };
        }
    }
}
