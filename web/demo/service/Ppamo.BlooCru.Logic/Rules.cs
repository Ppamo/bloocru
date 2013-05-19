using System;
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
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }

        #endregion
        #region "getUserInfo"

        public RESTFulResponse getUserInfo(RESTFulQuery query)
        {
            peopleByLogin people = new peopleByLogin(query.session.user.login);
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
            cboCollectionBase collection = new cboCollectionBase(typeof(placeCBO));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion

        #region "getPlace"

        public RESTFulResponse getPlace(RESTFulQuery query)
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
        #region "listPlaces"

        public RESTFulResponse listPlaces(RESTFulQuery query)
        {
            cboCollectionBase collection = new cboCollectionBase(typeof(placeCBO));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
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
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/localize[/]?$", localize));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people/[0-9]+$", getPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people[/]?$", listPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city[/]?$", getCity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city[/]?$", listCities));

            list.Add(new RESTFulBehavior("*", defaultRule));
            return list;

        }

        #endregion
        #region "GetUsers"

        public List<RESTFulUser> GetUsers()
        {
            List<RESTFulUser> list = new List<RESTFulUser>();
            list.Add(new RESTFulUser("hugo", "hugo.pass"));
            list.Add(new RESTFulUser("paco", "paco.pass"));
            list.Add(new RESTFulUser("luis", "luis.pass"));
            list.Add(new RESTFulUser("pablo", "testpass"));
            return list;
        }

        #endregion

        #endregion

    }

}
