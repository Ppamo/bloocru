﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.BlooCru.WS.Data.CBO;
using Ppamo.RESTFulWebServer;
using Ppamo.RESTFulWebServer.Data;
using Ppamo.DataProvider.MySql;

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
        #region "getUserInfo"

        public RESTFulResponse getUserInfo(RESTFulQuery query)
        {
            userCBO user = new userCBO(query.session.user.login);
            Worker.DbProvider.load(user);
            peopleByUserId people = new peopleByUserId(user.id);
            if (!Worker.DbProvider.load(people))
                return new RESTFulResponse(new PeopleNotFoundException(query.session.user.login));

            return new RESTFulResponse(people);
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
                cboCollectionBase collection = new cboCollectionBase(typeof(activityCBO));
                if (Worker.DbProvider.list(collection, "cityId = " + cityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "listEvents"

        public RESTFulResponse listEvents(RESTFulQuery query)
        {
            int cityId = 0;
            if (int.TryParse(query.queryNodes[3], out cityId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(eventCBO));
                if (Worker.DbProvider.list(collection, "cityId = " + cityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
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
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people/[0-9]+$", getPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people[/]?$", listPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+$", getCity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city[/]?$", listCities));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+/activity[/]?$", listActivities));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+/event[/]?$", listEvents));

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
                list.Add(new RESTFulUser(node.login, node.elogin, node.password));
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
            sessionCBO cbo = new sessionCBO();
            cbo.id = (session.sessionId.HasValue) ? session.sessionId.Value : 0;
            cbo.key = query.session.key;
            cbo.created = DateTime.Now;
            cbo.cityId = city.id;
            Worker.DbProvider.store(cbo);
            return true;
        }

        #endregion

        #endregion

    }

}
