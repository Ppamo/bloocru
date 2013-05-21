using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using NUnit.Framework;
using Ppamo.Common.Util;
using Ppamo.DataProvider.MySql;
using Ppamo.BlooCru.Logic;

namespace Ppamo.BlooCru.WS.Test
{

    [TestFixture]
    public class DataTest
    {

        #region "Properties"

        private cboCollectionBase cities = new cboCollectionBase(typeof(Data.CBO.cityCBO));
        private cboCollectionBase places = new cboCollectionBase(typeof(Data.CBO.placeCBO));
        private cboCollectionBase sessions = new cboCollectionBase(typeof(Data.CBO.sessionCBO));
        private cboCollectionBase users = new cboCollectionBase(typeof(Data.CBO.userCBO));
        private cboCollectionBase roles = new cboCollectionBase(typeof(Data.CBO.roleCBO));
        private cboCollectionBase peoples = new cboCollectionBase(typeof(Data.CBO.peopleCBO));
        private cboCollectionBase events = new cboCollectionBase(typeof(Data.CBO.eventCBO));
        private cboCollectionBase activities = new cboCollectionBase(typeof(Data.CBO.activityCBO));
        private cboCollectionBase conversations = new cboCollectionBase(typeof(Data.CBO.conversationCBO));
        private cboCollectionBase messages = new cboCollectionBase(typeof(Data.CBO.messageCBO));
        private SHA1 sha1 = new SHA1Managed();
        private string DateTimeToStringFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss";
        private DateTime databaseTime = DateTime.Now;

        #endregion

        #region "RecreateDatabaseTest"

        [Test]
        public void RecreateDatabaseTest()
        {

            RecreateDatabase();
            Assert.IsTrue(Worker.DbProvider.existsDataBase());
            Assert.IsTrue(Worker.DbProvider.existsTable("city"));
            Assert.IsTrue(Worker.DbProvider.existsTable("place"));
            Assert.IsTrue(Worker.DbProvider.existsTable("session"));
            Assert.IsTrue(Worker.DbProvider.existsTable("user"));
            Assert.IsTrue(Worker.DbProvider.existsTable("role"));
            Assert.IsTrue(Worker.DbProvider.existsTable("people"));
            Assert.IsTrue(Worker.DbProvider.existsTable("event"));
            Assert.IsTrue(Worker.DbProvider.existsTable("activity"));
            Assert.IsTrue(Worker.DbProvider.existsTable("conversation"));
            Assert.IsTrue(Worker.DbProvider.existsTable("message"));

        }

        #endregion
        #region "ReloadDataTest"

        [Test]
        public void ReloadDataTest()
        {

            ReloadDatabase();
            Assert.AreEqual(3, cities.Count);
            Assert.AreEqual(3, places.Count);
            Assert.AreEqual(3, sessions.Count);
            Assert.AreEqual(3, users.Count);
            Assert.AreEqual(3, roles.Count);
            Assert.AreEqual(3, peoples.Count);
            Assert.AreEqual(4, events.Count);
            Assert.AreEqual(5, activities.Count);
            Assert.AreEqual(3, conversations.Count);
            Assert.AreEqual(8, messages.Count);

        }

        #endregion
        #region "CheckStoredDataTest"

        [Test]
        public void CheckStoredDataTest()
        {
            ReloadDatabase();

            // session
            Data.CBO.sessionCBO session = (Data.CBO.sessionCBO)sessions.get(1);
            Assert.AreEqual(2, session.id);
            Assert.AreEqual(Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat)), session.key);
            Assert.GreaterOrEqual(60, (DateTime.Now.AddHours(-12) - session.created).TotalSeconds);
            Assert.GreaterOrEqual(60, (databaseTime - session.timestamp).TotalSeconds);
            session = (Data.CBO.sessionCBO)sessions.get(2);
            Assert.AreEqual(3, session.id);
            Assert.AreEqual(Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat)), session.key);
            Assert.GreaterOrEqual(60, (DateTime.Now - session.created).TotalSeconds);
            Assert.GreaterOrEqual(60, (databaseTime - session.timestamp).TotalSeconds);

            // user
            Data.CBO.userCBO user = (Data.CBO.userCBO)users.get(1);
            Assert.AreEqual(2, user.id);
            Assert.AreEqual("paco", user.login);
            Assert.AreEqual("paco@disney.com", user.email);
            Assert.AreEqual("pass.paco", user.password);

            // place
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.get(1);
            Assert.AreEqual(2, place.id);
            Assert.AreEqual("plaza de toros", place.name);
            Assert.AreEqual(-12.059, place.latitude);
            Assert.AreEqual(-77.064, place.longitude);
            Assert.AreEqual(10, place.zoom);

            // activity
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)activities.get(1);
            Assert.AreEqual(2, activity.id);
            Assert.AreEqual("carrete", activity.title);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", activity.description);
            Assert.AreEqual(new DateTime(2013, 04, 20, 13, 10, 0), activity.timestamp);
            Assert.AreEqual(2, activity.peopleId);

            // event
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.get(1);
            Assert.AreEqual(2, event_.id);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", event_.description);
            Assert.AreEqual(new DateTime(2013, 04, 21, 15, 00, 0), event_.timestamp);
            Assert.AreEqual(2, event_.peopleId);
            Assert.AreEqual(2, event_.placeId);

            // conversation
            Data.CBO.conversationCBO conversation = (Data.CBO.conversationCBO)conversations.get(0);
            Assert.AreEqual(3, conversations.Count);
            Assert.AreEqual(1, conversation.id);

            // messages
            Data.CBO.messageCBO message = (Data.CBO.messageCBO)messages.get(0);
            Assert.AreEqual("Nos juntamos para ir al cine a ls 8pm en recepción?", message.text);
            message = (Data.CBO.messageCBO)messages.get(4);
            Assert.AreEqual("para donde vamos?", message.text);

        }
        #endregion
        #region "PeopleListViewsTest"

        [Test]
        public void PeopleListViewsTest()
        {

            ReloadDatabase();
            cboCollectionBase collection = new cboCollectionBase(typeof(Data.CBO.peopleView));
            Worker.DbProvider.list(collection);
            Assert.IsNotNull(collection);
            Assert.AreEqual(3, collection.Count);

            Data.CBO.peopleView people = (Data.CBO.peopleView)collection.get(1);
            Assert.AreEqual(2, people.userId);
            Assert.AreEqual(2, people.peopleId);
            Assert.AreEqual(2, people.roleId);
            Assert.AreEqual("tripulante", people.roleName);
            Assert.AreEqual("paco", people.firstName);
            Assert.AreEqual("mcdonald", people.lastName);
            Assert.AreEqual("lima", people.cityName);
            Assert.AreEqual(DateTime.Today.AddYears(-18), people.birthDate);

            // get people from peopleId
            people = new Data.CBO.peopleView();
            people.peopleId = 3;
            Worker.DbProvider.load(people);
            Assert.AreEqual(3, people.userId);
            Assert.AreEqual(3, people.peopleId);
            Assert.AreEqual(3, people.roleId);
            Assert.AreEqual("asistente", people.roleName);
            Assert.AreEqual("luis", people.firstName);
            Assert.AreEqual("mcdonald", people.lastName);
            Assert.AreEqual("buenos aires", people.cityName);
            Assert.AreEqual(DateTime.Today.AddYears(-16), people.birthDate);

            // get people from login
            Data.CBO.peopleByUserId peopleByLogin = new Data.CBO.peopleByUserId(1);
            Worker.DbProvider.load(peopleByLogin);
            Assert.AreEqual(1, peopleByLogin.userId);
            Assert.AreEqual(1, peopleByLogin.peopleId);
            Assert.AreEqual(1, peopleByLogin.roleId);
            Assert.AreEqual("capitan", peopleByLogin.roleName);
            Assert.AreEqual("hugo", peopleByLogin.firstName);
            Assert.AreEqual("mcdonald", peopleByLogin.lastName);
            Assert.AreEqual("santiago", peopleByLogin.cityName);
            Assert.AreEqual(DateTime.Today.AddYears(-21), peopleByLogin.birthDate);

        }

        #endregion
        #region "SessionListViewTest"

        [Test]
        public void SessionListViewTest()
        {

            ReloadDatabase();
            cboCollectionBase collection = new cboCollectionBase(typeof(Data.CBO.sessionsByLogin));
            Worker.DbProvider.list(collection);
            Assert.IsNotNull(collection);
            Assert.AreEqual(3, collection.Count);

            Data.CBO.sessionsByLogin session = (Data.CBO.sessionsByLogin)collection.get(1);
            Assert.AreEqual("paco", session.login);
            Assert.AreEqual("lima", session.cityName);
            Assert.AreEqual(-12.059, session.latitude);
            Assert.AreEqual(-77.064, session.longitude);
            Assert.AreEqual(10, session.zoom);

            session = new Data.CBO.sessionsByLogin("luis");
            Worker.DbProvider.load(session);
            Assert.AreEqual("luis", session.login);
            Assert.AreEqual("buenos aires", session.cityName);
            Assert.AreEqual(-34.603, session.latitude);
            Assert.AreEqual(-58.381, session.longitude);
            Assert.AreEqual(9, session.zoom);

        }

        #endregion

        #region "Private Methods"

        #region "RecreateDatabase"

        private void RecreateDatabase()
        {
            Worker.DbProvider.dropDataBase();
            Worker.DbProvider.createDataBase();
            Worker.CreateDataBaseStructure();
            Worker.CreateDataBaseLogic();
        }

        #endregion
        #region "PopulateTestData"

        private void PopulateTestData()
        {
            string now = string.Empty;
            Worker.DbProvider.exec("SELECT NOW();", out now);
            databaseTime = Utils.getDateFromMask(now);

            // city
            cities.Clear();
            Data.CBO.cityCBO city = (Data.CBO.cityCBO)cities.store();
            city.name = "santiago";
            city.latitude = -33.440;
            city.longitude = -70.638;
            city.zoom = 10;
            city = (Data.CBO.cityCBO)cities.store();
            city.name = "lima";
            city.latitude = -12.059;
            city.longitude = -77.064;
            city.zoom = 10;
            city = (Data.CBO.cityCBO)cities.store();
            city.name = "buenos aires";
            city.latitude = -34.603;
            city.longitude = -58.381;
            city.zoom = 9;

            // place 
            places.Clear();
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.store();
            place.name = "plaza italia";
            place.latitude = -33.445;
            place.longitude = -70.638;
            place.zoom = 10;
            place.cityId = 1;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "plaza de toros";
            place.latitude = -12.059;
            place.longitude = -77.064;
            place.zoom = 10;
            place.cityId = 2;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "parque francia";
            place.latitude = -34.603;
            place.longitude = -58.381;
            place.zoom = 9;
            place.cityId = 3;

            // sessions
            sessions.Clear();
            Data.CBO.sessionCBO session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now.AddHours(-24);
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            session.cityId = 1;
            session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now.AddHours(-12);
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            session.cityId = 2;
            session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now;
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            session.cityId = 3;

            // users
            users.Clear();
            Data.CBO.userCBO user = (Data.CBO.userCBO)users.store();
            user.login = "hugo";
            user.password = "pass.hugo";
            user.elogin = Crypto.toSHA1(user.login);
            user.email = "hugo@disney.com";
            user.sessionId = 1;
            user = (Data.CBO.userCBO)users.store();
            user.login = "paco";
            user.password = "pass.paco";
            user.elogin = Crypto.toSHA1(user.login);
            user.email = "paco@disney.com";
            user.sessionId = 2;
            user = (Data.CBO.userCBO)users.store();
            user.login = "luis";
            user.password = "pass.luis";
            user.elogin = Crypto.toSHA1(user.login);
            user.email = "luis@disney.com";
            user.sessionId = 3;

            // role
            roles.Clear();
            Data.CBO.roleCBO role = (Data.CBO.roleCBO)roles.store();
            role.name = "capitan";
            role = (Data.CBO.roleCBO)roles.store();
            role.name = "tripulante";
            role = (Data.CBO.roleCBO)roles.store();
            role.name = "asistente";

            // people
            peoples.Clear();
            Data.CBO.peopleCBO people = (Data.CBO.peopleCBO)peoples.store();
            people.userId = 1;
            people.firstName = "hugo";
            people.lastName = "mcdonald";
            people.birthDate = DateTime.Today.AddYears(-21);
            people.roleId = 1;
            people.description = "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas";
            people = (Data.CBO.peopleCBO)peoples.store();
            people.userId = 2;
            people.firstName = "paco";
            people.lastName = "mcdonald";
            people.birthDate = DateTime.Today.AddYears(-18);
            people.roleId = 2;
            people.description = "Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula";
            people = (Data.CBO.peopleCBO)peoples.store();
            people.userId = 3;
            people.firstName = "luis";
            people.lastName = "mcdonald";
            people.birthDate = DateTime.Today.AddYears(-16);
            people.roleId = 3;
            people.description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus";

            // event
            events.Clear();
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            event_.timestamp = new DateTime(2013, 04, 21, 14, 45, 0);
            event_.peopleId = 1;
            event_.placeId = 1;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "juntemonos aca para ir bellavista en la noche";
            event_.timestamp = new DateTime(2013, 04, 21, 15, 00, 0);
            event_.peopleId = 2;
            event_.placeId = 2;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "donde nos juntamos?";
            event_.timestamp = new DateTime(2013, 04, 21, 16, 00, 0);
            event_.peopleId = 3;
            event_.placeId = 3;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "damos una vuelta por la plaza";
            event_.timestamp = new DateTime(2013, 04, 21, 17, 00, 0);
            event_.peopleId = 2;
            event_.placeId = 3;

            // activities
            activities.Clear();
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "cine";
            activity.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            activity.timestamp = new DateTime(2013, 04, 20, 12, 13, 0);
            activity.peopleId = 1;
            activity.cityId = 1;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "carrete";
            activity.description = "juntemonos aca para ir bellavista en la noche";
            activity.timestamp = new DateTime(2013, 04, 20, 13, 10, 0);
            activity.peopleId = 2;
            activity.cityId = 2;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "shopping";
            activity.description = "vamos de shopping al centro";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 0, 0);
            activity.peopleId = 3;
            activity.cityId = 3;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "toros en la plaza";
            activity.description = "hay corrida de toros ma&ntilde;ana en la plaza acho";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 30, 0);
            activity.peopleId = 2;
            activity.cityId = 2;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "paseo esta tarde";
            activity.description = "damos una vuelta por la plaza";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 45, 0);
            activity.peopleId = 3;
            activity.cityId = 3;

            // conversation
            conversations.Clear();
            Data.CBO.conversationCBO conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.peopleId = 1;
            conversation.activityId = 1;
            conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.peopleId = 2;
            conversation.eventId = 1;
            conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.peopleId = 3;
            conversation.activityId = 1;

            // messages
            messages.Clear();
            Data.CBO.messageCBO message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 1;
            message.conversationId = 1;
            message.text = "Nos juntamos para ir al cine a ls 8pm en recepción?";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 2;
            message.conversationId = 1;
            message.text = "me anoto!";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 1;
            message.conversationId = 1;
            message.text = "excelente...";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 2;
            message.conversationId = 2;
            message.text = "juntemonos aca para ir bellavista en la noche";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 3;
            message.conversationId = 2;
            message.text = "para donde vamos?";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 1;
            message.conversationId = 2;
            message.text = "pio nono";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 3;
            message.conversationId = 3;
            message.text = "vamos de shopping al centro";
            message = (Data.CBO.messageCBO)messages.store();
            message.peopleId = 2;
            message.conversationId = 3;
            message.text = "vamos";

            // Store the data
            Worker.DbProvider.store(cities);
            Worker.DbProvider.store(places);
            Worker.DbProvider.store(sessions);
            Worker.DbProvider.store(users);
            Worker.DbProvider.store(roles);
            Worker.DbProvider.store(peoples);
            Worker.DbProvider.store(events);
            Worker.DbProvider.store(activities);
            Worker.DbProvider.store(conversations);
            Worker.DbProvider.store(messages);

        }

        #endregion
        #region "ReloadDataFromDatabase"
        private void ReloadDataFromDatabase()
        {

            cities.Clear();
            Worker.DbProvider.list(cities);
            places.Clear();
            Worker.DbProvider.list(places);
            sessions.Clear();
            Worker.DbProvider.list(sessions);
            users.Clear();
            Worker.DbProvider.list(users);
            roles.Clear();
            Worker.DbProvider.list(roles);
            peoples.Clear();
            Worker.DbProvider.list(peoples);
            events.Clear();
            Worker.DbProvider.list(events);
            activities.Clear();
            Worker.DbProvider.list(activities);
            conversations.Clear();
            Worker.DbProvider.list(conversations);
            messages.Clear();
            Worker.DbProvider.list(messages);

        }
        #endregion
        #region "ReloadDatabase"

        private void ReloadDatabase()
        {
            RecreateDatabase();
            PopulateTestData();
            ReloadDataFromDatabase();
        }

        #endregion

        #endregion

    }

}
