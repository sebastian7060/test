using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eje1back.Controllers
{
    public class TriquiController : ApiController
    {
        // GET: api/Triqui
        public IEnumerable<string> Get()

        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Triqui/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Triqui
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Triqui/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Triqui/5
        public void Delete(int id)
        {
        }
    }
}
