using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.Common.RESTFulServer;
using Ppamo.Common.RESTFulServer.Data;
using Ppamo.BlooCru.WS.Data.CBO;

namespace Ppamo.BlooCru.Logic
{

    public class Rules : IServiceHandler
    {

        #region "Delegates"

        #region "getNavigationkey"

        public RESTFulResponse getNavigationKey(RESTFulQuery query)
        {
            // GET /nav/{login}/{code}
            string email = query.queryNodes[1];
            string code = query.queryNodes[2];

            return new RESTFulResponse("AAA");
        }

        #endregion
        #region "getPeopleById"

        public RESTFulResponse getPeopleById(RESTFulQuery query)
        {
            // GET /{key}/people/(id)
            if (checkKey(query))
            {
                userCBO user = null;
                user.id = int.Parse(query.queryNodes[2]);
                Worker.DbProvider.load(user);

            }
            else
            {
                return new RESTFulResponse(new  NonValidKeyException());
            }
            return new RESTFulResponse("AAA");
        }
        #endregion

        #endregion

        #region "Private Methods"

        #region "checkKey"

        private Boolean checkKey(RESTFulQuery query)
        {
            return true;
        }

        #endregion
        #region "SerializeJsonResponse"

        private string SerializeJsonResponse(string code)
        {

            return string.Empty;
        }

        #endregion

        #endregion

        #region "Populate Behaviors"
        public RESTFulBehavior[] getBehaviors()
        {
            RESTFulBehavior[] list = (RESTFulBehavior[])Array.CreateInstance(typeof(RESTFulBehavior), 15);

            // GET /nav/{login}/{code} <-- {key}
            list[0] = new RESTFulBehavior("^GET /nav/\\{.*\\}[/]?$", getNavigationKey);
            // GET /{key}/people/(id)
            list[1] = new RESTFulBehavior("^GET /\\{.*\\}/\\{.*\\}/people/[0-9][0-9]*$", getPeopleById);
            // GET /{key}/localizate
            list[2] = new RESTFulBehavior("", null);
            // GET /{key}/city
            list[3] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)
            list[4] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/people
            list[5] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/activity
            list[6] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/activity/(id)
            list[7] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/activity/(id)/participate
            list[8] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/activity/(id)/participate/(id)
            list[9] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/event
            list[10] = new RESTFulBehavior("", null);
            // GET /{key}/city/(id)/event/(id)
            list[11] = new RESTFulBehavior("", null);
            // GET /{key}/place/(id)
            list[12] = new RESTFulBehavior("", null);
            // POST /{key}/city/(id)/activity
            list[13] = new RESTFulBehavior("", null);
            // POST /{key}/event
            list[14] = new RESTFulBehavior("", null);

            return list;
        }
        #endregion

    }

}
