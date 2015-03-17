using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace idsrv3.Controllers
{
    [Route("test")]
    public class TestController : ApiController
    {
        public IHttpActionResult Get()
        {
            var caller = User as ClaimsPrincipal;

            var subjectClaim = caller.FindFirst("sub").Value;

            return Json(new
            {
                message = "You See this then it's ok",
                subject = subjectClaim
            });
        }
    }
}
