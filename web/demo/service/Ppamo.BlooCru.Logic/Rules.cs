using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.BlooCru.WS.Data.CBO;
using Ppamo.RESTFulWebServer;
using Ppamo.RESTFulWebServer.Data;

namespace Ppamo.BlooCru.Logic
{

    public class Rules : IServerHandler
    {

        #region "Delegates"

        #region "getNavigationKey"

        public RESTFulResponse getNavigationKey(RESTFulQuery query)
        {
            // POST /key/
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }

        #endregion
        #region "localize"
        public RESTFulResponse localize(RESTFulQuery query)
        {
            // GET /{key}/localize : placeCBO
            
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "getProfile"
        public RESTFulResponse getProfile(RESTFulQuery query)
        {
            // GET /{key}/profile/(id) : userCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "listPlaces"
        public RESTFulResponse listPlaces(RESTFulQuery query)
        {
            // GET /{key}/place : placeCBOCollection
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "listActivitiesByPlace"
        public RESTFulResponse listActivitiesByPlace(RESTFulQuery query)
        {
            // GET /{key}/place/(id)/activity : placeCBOCollection
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "getActivity"
        public RESTFulResponse getActivity(RESTFulQuery query)
        {
            // GET /{key}/activity/(id) : activityCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "listParticipantsInActivity"
        public RESTFulResponse listParticipantsInActivity(RESTFulQuery query)
        {
            // GET /{key}/activity/(id)/people : peopleCBOCollection
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "storeParticipant"
        public RESTFulResponse storeParticipant(RESTFulQuery query)
        {
            // POST /{key}/activity/(id)/people : peopleCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "storeActivity"
        public RESTFulResponse storeActivity(RESTFulQuery query)
        {
            // POST /{key}/activity : activityCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "listEventsByPlace"
        public RESTFulResponse listEventsByPlace(RESTFulQuery query)
        {
            // GET /{key}/city/(id)/event : eventCBOCollection
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "getEvent"
        public RESTFulResponse getEvent(RESTFulQuery query)
        {
            // GET /{key}/event/(id) : eventCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "storePlace"
        public RESTFulResponse storePlace(RESTFulQuery query)
        {
            // POST /{key}/place : placeCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "storeEvent"
        public RESTFulResponse storeEvent(RESTFulQuery query)
        {
            // POST /{key}/event : eventCBO
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }
        #endregion
        #region "defaultRule"
        public RESTFulResponse defaultRule(RESTFulQuery query)
        {
            // *
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
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

        #endregion
        #region "Populate Behaviors"
        public RESTFulBehavior[] GetBehaviors()
        {

            List<RESTFulBehavior> list = new List<RESTFulBehavior>();
            list.Add(new RESTFulBehavior("^POST /key[/]?$", getNavigationKey));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/localize[/]?$", localize));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/profile/[0-9]+$", getProfile));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/place[/]?$", listPlaces));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/place/[0-9]+/activity[/]?$", listActivitiesByPlace));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+$", getActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+/people[/]?$", listParticipantsInActivity));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/activity/[0-9]+/people[/]?$", storeParticipant));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/activity[/]?$", storeActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/place/[0-9]+/event[/]?$", listEventsByPlace));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/event/[0-9]+$", getEvent));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/place[/]?$", storePlace));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/event[/]?$", storeEvent));
            list.Add(new RESTFulBehavior("*", defaultRule));
            return list.ToArray();

        }
        #endregion

    }

}
