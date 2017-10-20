using System;
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

        #region "Properties"

        private List<BloocruRestUser> users = new List<BloocruRestUser>();

        #endregion

        #region "Delegates"

        #region "localize"

        public RESTFulResponse localize(RESTFulQuery query)
        {
            this.touchSession(query);
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
            this.touchSession(query);
            cityCBO city = (cityCBO)JSon.Util.JSon2CBO(query.postData, typeof(cityCBO));
            storeSession(query, city);
            return new RESTFulResponse(city);
        }

        #endregion
        #region "getUserInfo"

        public RESTFulResponse getUserInfo(RESTFulQuery query)
        {
            this.touchSession(query);
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
                peopleById output = new peopleById(people.id);
                Worker.DbProvider.load(output);

                return new RESTFulResponse(output);
            }
            return new RESTFulResponse(info.getPeopleAsPeopleById());
        }

        #endregion
        #region "storeUserInfo"

        public RESTFulResponse storeUserInfo(RESTFulQuery query)
        {
            this.touchSession(query);
            peopleById people = (peopleById)JSon.Util.JSon2CBO(query.postData, typeof(peopleById));
            peopleCBO cbo = new peopleCBO();
            cbo.id = people.peopleId;
            cbo.userId = query.session.user.id;
            cbo.firstName = people.firstName;
            cbo.lastName = people.lastName;
            cbo.birthDate = people.birthDate;
            cbo.roleId = people.roleId;
            cbo.description = people.description;
            Worker.DbProvider.store(cbo);
            Worker.DbProvider.load(people);
            return new RESTFulResponse(people);
        }

        #endregion
        #region "getPeople"

        public RESTFulResponse getPeople(RESTFulQuery query)
        {
            this.touchSession(query);
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
        #region "getPeopleConnected"

        public RESTFulResponse getPeopleConnected(RESTFulQuery query)
        {
            this.touchSession(query);
            int cityId = 0;
            if (int.TryParse(query.queryNodes[3], out cityId))
            {
                BloocruRestUser user = (BloocruRestUser)query.session.user;
                List<BloocruRestUser> connectedUsers = users.FindAll(u => u.cityId == cityId);
                cboCollectionBase collection = new cboCollectionBase(typeof(ConnectedPeople));
                ConnectedPeople people;
                foreach (BloocruRestUser node in connectedUsers)
                {
                    people = new ConnectedPeople(node);
                    collection.store(people);
                }
                return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new PlaceNotFoundException());
        }
        #endregion
        #region "listPeople"

        public RESTFulResponse listPeople(RESTFulQuery query)
        {
            this.touchSession(query);
            cboCollectionBase collection = new cboCollectionBase(typeof(peopleById));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new PeopleNotFoundException());
        }

        #endregion
        #region "getCity"

        public RESTFulResponse getCity(RESTFulQuery query)
        {
            this.touchSession(query);
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
        #region "listJoinActivity"

        public RESTFulResponse listJoinActivity(RESTFulQuery query)
        {
            this.touchSession(query);

            int activityId = 0;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                cboCollectionBase collection = new cboCollectionBase(typeof(joinCBO));
                if (Worker.DbProvider.list(collection, "activityId = " + activityId.ToString()))
                    return new RESTFulResponse(collection);
            }
            return new RESTFulResponse(new ActivityNotFoundException());

        }

        #endregion
        #region "joinActivity"

        public RESTFulResponse joinActivity(RESTFulQuery query)
        {
            this.touchSession(query);
            int activityId = 0;
            joinCBO cbo = null;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                BloocruRestUser user = (BloocruRestUser)query.session.user;
                cbo = new joinCBO(user.peopleId, activityId);
                Worker.DbProvider.store(cbo);
            }
            return new RESTFulResponse(cbo);
        }

        #endregion
        #region "unjoinActivity"

        public RESTFulResponse unjoinActivity(RESTFulQuery query)
        {
            this.touchSession(query);
            int activityId = 0;
            joinCBO cbo = null;
            if (int.TryParse(query.queryNodes[3], out activityId))
            {
                BloocruRestUser user = (BloocruRestUser)query.session.user;
                cbo = new joinCBO(user.peopleId, activityId);
                Worker.DbProvider.delete(cbo);
            }
            return new RESTFulResponse(cbo);
        }

        #endregion
        #region "listRoles"

        public RESTFulResponse listRoles(RESTFulQuery query)
        {
            this.touchSession(query);
            cboCollectionBase collection = new cboCollectionBase(typeof(roleCBO));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new RoleNotFoundException());
        }

        #endregion
        #region "listCities"

        public RESTFulResponse listCities(RESTFulQuery query)
        {
            this.touchSession(query);
            cboCollectionBase collection = new cboCollectionBase(typeof(cityCBO));
            if (Worker.DbProvider.list(collection))
                return new RESTFulResponse(collection);
            return new RESTFulResponse(new PlaceNotFoundException());
        }

        #endregion
        #region "listActivities"

        public RESTFulResponse listActivities(RESTFulQuery query)
        {
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
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
            this.touchSession(query);
            return new RESTFulResponse(new InvalidURIException(query.queryPath));
        }

        #endregion

        #endregion
        #region "Rules Interface Implementation"

        #region "GetBehaviors"

        public List<RESTFulBehavior> GetBehaviors()
        {
            debug("getting the behaviors");
            List<RESTFulBehavior> list = new List<RESTFulBehavior>();
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/localize[/]?$", localize));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/localize[/]?$", storeLocalization));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/profile[/]?$", getUserInfo));
            list.Add(new RESTFulBehavior("^POST /\\{.*\\}/profile[/]?$", storeUserInfo));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people/[0-9]+$", getPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/people[/]?$", listPeople));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+$", getCity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city[/]?$", listCities));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/role[/]?$", listRoles));
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
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+/joined$", listJoinActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+/join$", joinActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/activity/[0-9]+/unjoin$", unjoinActivity));
            list.Add(new RESTFulBehavior("^GET /\\{.*\\}/city/[0-9]+/people[/]?$", getPeopleConnected));

            list.Add(new RESTFulBehavior("*", defaultRule));
            return list;

        }

        #endregion
        #region "GetUsers"

        public List<RESTFulUser> GetUsers()
        {
            debug("get the users");
            users.Clear();
            cboCollectionBase __users = new cboCollectionBase(typeof(userPeopleView));
            Worker.DbProvider.list(__users);

            List<RESTFulUser> list = new List<RESTFulUser>();
            BloocruRestUser user;
            foreach (userPeopleView node in __users)
            {
                user = new BloocruRestUser(node);
                users.Add(user);
                list.Add((RESTFulUser)user);
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
            cbo.updated = DateTime.Now;
            cbo.cityId = city.id;
            Worker.DbProvider.store(cbo);
            // now update the user table
            userCBO user = new userCBO(query.session.user.id);
            Worker.DbProvider.load(user);
            user.sessionId = cbo.id;
            Worker.DbProvider.store(user);
            // update the session's user data
            BloocruRestUser sessionuser = (BloocruRestUser)users.Find(u => u.id == query.session.user.id);
            sessionuser.sessionId = cbo.id;
            sessionuser.cityId = city.id;
            return true;

        }

        #endregion
        #region "touchSession"

        private Boolean touchSession(RESTFulQuery query)
        {
            BloocruRestUser user = (BloocruRestUser)users.Find(u => u.id == query.session.user.id);
            user.updated = DateTime.Now;
            return true;
        }

        #endregion
        #region "debug"

        private void debug(string message)
        {
            Ppamo.Common.Util.Logger.log.Debug("blcru: " + message);
        }
        #endregion

        #endregion

    }

    #region "BloocruRestuser"

    public class BloocruRestUser: RESTFulUser
    {

        #region "Constructor"

        public BloocruRestUser()
            : base()
        {
            this.created = DateTime.MinValue;
            this.updated = DateTime.MinValue;
        }
        public BloocruRestUser(string login, string elogin, string password, int userId, int peopleId)
            : base(login, elogin, password, userId)
        {
            this.peopleId = peopleId;
            this.created = DateTime.MinValue;
            this.updated = DateTime.MinValue;
        }
        public BloocruRestUser(userPeopleView people): base(people.login, people.elogin, people.password, people.userId)
        {
            this.peopleId = people.peopleId;
            this.firstName = people.firstName;
            this.lastName = people.lastName;
            this.sessionId = (people.sessionId.HasValue) ? people.sessionId.Value : 0;
            this.cityId = people.cityId;
            this.created = DateTime.MinValue;
            this.updated = DateTime.MinValue;
        }

        #endregion

        public int peopleId { get; set; }
        public int sessionId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int cityId { get; set; }
        public DateTime created { get; set; }
        public DateTime updated { get; set; }

    }

    #endregion
    #region "ConnectedPeople"

    public class ConnectedPeople: peopleCBO
    {

        #region "ConnectedPeople"

        public ConnectedPeople():base() { }
        public ConnectedPeople(BloocruRestUser user): base()
        {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.userId = user.id;
            // status 0: disconnected, 1: connected, 2: sleeping
            this.connectedStatus = 0;
            DateTime now = DateTime.Now;
            if ((now - user.updated).TotalMinutes <= 5)
                this.connectedStatus = ((now - user.updated).TotalMinutes <= 2) ? 1 : 2;
        }

        #endregion

        public int connectedStatus { get; set; }

    }

    #endregion

}
