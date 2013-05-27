﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.BlooCru.WS.Data.CBO;
using Ppamo.RESTFulWebServer;
using Ppamo.RESTFulWebServer.Data;
using Ppamo.DataProvider.MySql;
using JSon = Ppamo.DataProvider.JSon;

namespace Ppamo.BlooCru.Logic
{

    public class Rules : IServerHandler
    {

        #region "Delegates"

        #region "localize"

        public RESTFulResponse localize(RESTFulQuery query)
        {
            sessionsByLogin session = new sessionsByLogin(query.session.user.login);
            cityCBO city = new cityCBO(1);
            if (Worker.DbProvider.load(session))
            {
                city.id = session.cityId;
                city.name = session.cityName;
                city.latitude = session.latitude;
                city.longitude = session.longitude;
                city.zoom = session.zoom;
            }
            else
                Worker.DbProvider.load(city);

            // here I should save the session
            storeSession(query, city);
            return new RESTFulResponse(city);
        }

        #endregion
        #region "storeLocalization"

        public RESTFulResponse storeLocalization(RESTFulQuery query)
        {
            cityCBO city = (cityCBO)JSon.Util.JSon2CBO(query.postData, typeof(cityCBO));
            storeSession(query, city);
            return new RESTFulResponse(city);
        }

        #endregion
        #region "getUserInfo"

        public RESTFulResponse getUserInfo(RESTFulQuery query)
        {
            peopleByLogin info = new peopleByLogin(query.session.user.login);
            Worker.DbProvider.load(info);
            if (info.peopleId == 0)
            {
                // create a default profile
                peopleCBO people = new peopleCBO();
                people.userId = query.session.user.id;
                people.firstName = query.session.user.login;
                people.lastName = "doe";
                cboCollectionBase roles = new cboCollectionBase(typeof(roleCBO));
                Worker.DbProvider.list(roles);
                if (roles.Count > 0)
                    people.roleId = ((roleCBO)roles.get(roles.Count - 1)).id;
                Worker.DbProvider.store(people);
                return new RESTFulResponse(info.getPeopleAsPeopleById());
            }
            return new RESTFulResponse(info.getPeopleAsPeopleById());
        }

        #endregion
        #region "getPeople"

        public RESTFulResponse getPeople(RESTFulQuery query)
        {
            int id = 0;
            if (int.TryParse(query.queryNodes[3], out id))
            {
                peopleById people = new peopleById(id);
                if (Worker.DbProvider.load(people))
                    return new RESTFulResponse(people);
            }
            return new RESTFulResponse(new PeopleNotFoundException());

        }
        #endregion
        #region "listPeople"

        public RESTFulResponse listPeople(RESTFulQuery query)
        {
            cboCollectionBase collection = new cboCollectionBase(typeof(peopleById));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new PeopleNotFoundException());
        }

        #endregion
        #region "getCity"

        public RESTFulResponse getCity(RESTFulQuery query)
        {
            int id = 0;
            if (int.TryParse(query.queryNodes[3], out id))
            {
                placeCBO place = new placeCBO();
                place.id = id;
                if (Worker.DbProvider.load(place))
                    return new RESTFulResponse(place);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "listCities"

        public RESTFulResponse listCities(RESTFulQuery query)
        {
            cboCollectionBase collection = new cboCollectionBase(typeof(cityCBO));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "listActivities"

        public RESTFulResponse listActivities(RESTFulQuery query)
        {
            int cityId = 0;
            if (int.TryParse(query.queryNodes[3], out cityId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(activitiesView));
                if (Worker.DbProvider.list(collection, "cityId = " + cityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "getActivity"

        public RESTFulResponse getActivity(RESTFulQuery query)
        {
            int activityId = 0;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                activitiesView cbo = new activitiesView();
                cbo.id = activityId;
                if (Worker.DbProvider.load(cbo))
                    return new RESTFulResponse(cbo);
            }
            return new RESTFulResponse(new ActivityNotFoundException());
        }

        #endregion
        #region "listEvents"

        public RESTFulResponse listEvents(RESTFulQuery query)
        {
            int cityId = 0;
            if (int.TryParse(query.queryNodes[3], out cityId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(eventsView));
                if (Worker.DbProvider.list(collection, "cityId = " + cityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "getEvent"

        public RESTFulResponse getEvent(RESTFulQuery query)
        {
            int eventId = 0;
            if (int.TryParse(query.queryNodes[3], out eventId))
            {
                eventsView cbo = new eventsView(eventId);
                if (Worker.DbProvider.load(cbo))
                    return new RESTFulResponse(cbo);
            }
            return new RESTFulResponse(new EventNotFoundException());
        }

        #endregion
        #region "listConversationByEventId"

        public RESTFulResponse listConversationByEventId(RESTFulQuery query)
        {
            int eventId = 0;
            if (int.TryParse(query.queryNodes[3], out eventId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(conversationView));
                if (Worker.DbProvider.list(collection, "eventId = " + eventId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new EventNotFoundException());
        }

        #endregion
        #region "listConversationByActivityId"

        public RESTFulResponse listConversationByActivityId(RESTFulQuery query)
        {
            int activityId = 0;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(conversationView));
                if (Worker.DbProvider.list(collection, "activityId = " + activityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new ActivityNotFoundException());
        }

        #endregion
        #region "storeActivity"

        public RESTFulResponse storeActivity(RESTFulQuery query)
        {
            activityCBO activity = (activityCBO)JSon.Util.JSon2CBO(query.postData, typeof(activityCBO));
            peopleByLogin people = new peopleByLogin(query.session.user.login);
            Worker.DbProvider.load(people);
            activity.peopleId = people.peopleId;
            Worker.DbProvider.store(activity);
            if (activity.id != 0)
                return new RESTFulResponse(activity);

            return new RESTFulResponse(new ActivityNotFoundException());
        }

        #endregion
        #region "storeEvent"

        public RESTFulResponse storeEvent(RESTFulQuery query)
        {
            eventsView node = (eventsView)JSon.Util.JSon2CBO(query.postData, typeof(eventsView));
            placeCBO place = new placeCBO();
            place.name = node.placeName;
            place.latitude = node.latitude;
            place.longitude = node.longitude;
            place.zoom = node.zoom;
            place.cityId = node.cityId;
            Worker.DbProvider.store(place);
            eventCBO cbo = new eventCBO();
            cbo.id = 0;
            cbo.description = node.description;
            cbo.peopleId = node.peopleId;
            cbo.placeId = place.id;
            Worker.DbProvider.store(cbo);
            if (cbo.id != 0)
                return new RESTFulResponse(cbo);

            return new RESTFulResponse(new EventNotFoundException());
        }

        #endregion
        #region "storeEventMessage"

        public RESTFulResponse storeEventMessage(RESTFulQuery query)
        {
            int eventId = 0;
            if (int.TryParse(query.queryNodes[3], out eventId))
            {
                string messageId = string.Empty;
                messageCBO message = (messageCBO)JSon.Util.JSon2CBO(query.postData, typeof(messageCBO));
                string command = string.Format("CALL `storeConversationMessage` ('{0}', {1}, NULL, '{2}');", query.session.user.login, eventId.ToString(), message.text);
                Worker.DbProvider.exec(command, out messageId);
                conversationView newMessage = new conversationView(int.Parse(messageId));
                Worker.DbProvider.load(newMessage);
                return new RESTFulResponse(newMessage);
            }
            return new RESTFulResponse(new EventNotFoundException());
        }

        #endregion
        #region "storeActivityMessage"

        public RESTFulResponse storeActivityMessage(RESTFulQuery query)
        {
            int activityId = 0;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                string messageId = string.Empty;
                messageCBO message = (messageCBO)JSon.Util.JSon2CBO(query.postData, typeof(messageCBO));
                string command = string.Format("CALL `storeConversationMessage` ('{0}', NULL, {1}, '{2}');", query.session.user.login, activityId.ToString(), message.text);
                Worker.DbProvider.exec(command, out messageId);
                conversationView newMessage = new conversationView(int.Parse(messageId));
                Worker.DbProvider.load(newMessage);
                return new RESTFulResponse(newMessage);
            }
            return new RESTFulResponse(new ActivityNotFoundException());
        }

        #endregion

        #region "defaultRule"

        public RESTFulResponse defaultRule(RESTFulQuery query)
        {
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }

        #endregion

        #endregion
        #region "Rules Interface Implementation"

        #region "GetBehaviors"

        public List<RESTFulBehavior> GetBehaviors()
        {

            List<RESTFulBehavior> list = new List<RESTFulBehavior>();
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/localize[/]?$", localize));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/localize[/]?$", storeLocalization));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/profile[/]?$", getUserInfo));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people/[0-9]+$", getPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people[/]?$", listPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+$", getCity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city[/]?$", listCities));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+$", getActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+/activity[/]?$", listActivities));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/event/[0-9]+$", getEvent));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+/event[/]?$", listEvents));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/event/[0-9]+/conversation[/]?$", listConversationByEventId));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+/conversation[/]?$", listConversationByActivityId));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/event[/]?$", storeEvent));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/activity[/]?$", storeActivity));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/event/[0-9]+/conversation[/]?$", storeEventMessage));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/activity/[0-9]+/conversation[/]?$", storeActivityMessage));

            list.Add(new RESTFulBehavior("*", defaultRule));
            return list;

        }

        #endregion
        #region "GetUsers"

        public List<RESTFulUser> GetUsers()
        {
            cboCollectionBase users = new cboCollectionBase(typeof(userCBO));
            Worker.DbProvider.list(users);
            List<RESTFulUser> list = new List<RESTFulUser>();
            foreach (userCBO node in users)
            {
                list.Add(new RESTFulUser(node.login, node.elogin, node.password, node.id));
            }
            return list;
        }

        #endregion

        #endregion
        #region "private methods"

        #region "storeSession"

        private Boolean storeSession(RESTFulQuery query, cityCBO city)
        {
            sessionsByLogin session = new sessionsByLogin(query.session.user.login);
            Worker.DbProvider.load(session);
            sessionCBOByKey cbo = new sessionCBOByKey();
            cbo.id = (session.sessionId.HasValue) ? session.sessionId.Value : 0;
            cbo.key = query.session.key;
            cbo.created = DateTime.Now;
            cbo.cityId = city.id;
            Worker.DbProvider.store(cbo);
            // now update the user table
            userCBO user = new userCBO(query.session.user.id);
            Worker.DbProvider.load(user);
            user.sessionId = cbo.id;
            Worker.DbProvider.store(user);
            return true;
        }

        #endregion

        #endregion

    }

}
