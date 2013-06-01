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

        #region "RecreateDatabaseTest"

        [Test]
        public void RecreateDatabaseTest()
        {

            TestWorker.RecreateDatabase();
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

            TestWorker.ReloadDatabase();
            Assert.AreEqual(3, TestWorker.cities.Count);
            Assert.AreEqual(3, TestWorker.places.Count);
            Assert.AreEqual(3, TestWorker.sessions.Count);
            Assert.AreEqual(3, TestWorker.users.Count);
            Assert.AreEqual(3, TestWorker.roles.Count);
            Assert.AreEqual(3, TestWorker.peoples.Count);
            Assert.AreEqual(4, TestWorker.events.Count);
            Assert.AreEqual(5, TestWorker.activities.Count);
            Assert.AreEqual(3, TestWorker.conversations.Count);
            Assert.AreEqual(8, TestWorker.messages.Count);

        }

        #endregion
        #region "CheckStoredDataTest"

        [Test]
        public void CheckStoredDataTest()
        {
            TestWorker.ReloadDatabase();

            // session
            Data.CBO.sessionCBO session = (Data.CBO.sessionCBO)TestWorker.sessions.get(1);
            Assert.AreEqual(2, session.id);
            Assert.AreEqual(Crypto.toSHA1(session.updated.ToString(TestWorker.DateTimeToStringFormat)), session.key);
            Assert.GreaterOrEqual(60, (DateTime.Now.AddHours(-12) - session.updated).TotalSeconds);
            Assert.GreaterOrEqual(60, (TestWorker.databaseTime - session.timestamp).TotalSeconds);
            session = (Data.CBO.sessionCBO)TestWorker.sessions.get(2);
            Assert.AreEqual(3, session.id);
            Assert.AreEqual(Crypto.toSHA1(session.updated.ToString(TestWorker.DateTimeToStringFormat)), session.key);
            Assert.GreaterOrEqual(60, (DateTime.Now - session.updated).TotalSeconds);
            Assert.GreaterOrEqual(60, (TestWorker.databaseTime - session.timestamp).TotalSeconds);

            // user
            Data.CBO.userCBO user = (Data.CBO.userCBO)TestWorker.users.get(1);
            Assert.AreEqual(2, user.id);
            Assert.AreEqual("paco", user.login);
            Assert.AreEqual("paco@disney.com", user.email);
            Assert.AreEqual("pass.paco", user.password);

            // place
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)TestWorker.places.get(1);
            Assert.AreEqual(2, place.id);
            Assert.AreEqual("plaza de toros", place.name);
            Assert.AreEqual(-12.059, place.latitude);
            Assert.AreEqual(-77.064, place.longitude);
            Assert.AreEqual(10, place.zoom);

            // activity
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)TestWorker.activities.get(1);
            Assert.AreEqual(2, activity.id);
            Assert.AreEqual("carrete", activity.title);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", activity.description);
            Assert.AreEqual(new DateTime(2013, 04, 20, 13, 10, 0), activity.timestamp);
            Assert.AreEqual(2, activity.peopleId);

            // event
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)TestWorker.events.get(1);
            Assert.AreEqual(2, event_.id);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", event_.description);
            Assert.AreEqual(new DateTime(2013, 04, 21, 15, 00, 0), event_.timestamp);
            Assert.AreEqual(2, event_.peopleId);
            Assert.AreEqual(2, event_.placeId);

            // conversation
            Data.CBO.conversationCBO conversation = (Data.CBO.conversationCBO)TestWorker.conversations.get(0);
            Assert.AreEqual(3, TestWorker.conversations.Count);
            Assert.AreEqual(1, conversation.id);

            // messages
            Data.CBO.messageCBO message = (Data.CBO.messageCBO)TestWorker.messages.get(0);
            Assert.AreEqual("Nos juntamos para ir al cine a ls 8pm en recepción?", message.text);
            message = (Data.CBO.messageCBO)TestWorker.messages.get(4);
            Assert.AreEqual("para donde vamos?", message.text);

        }
        #endregion
        #region "PeopleListViewsTest"

        [Test]
        public void PeopleListViewsTest()
        {

            TestWorker.ReloadDatabase();
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

            TestWorker.ReloadDatabase();
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
        #region "EventListViewTest"

        [Test]
        public void EventListViewTest()
        {

            TestWorker.ReloadDatabase();
            cboCollectionBase collection = new cboCollectionBase(typeof(Data.CBO.eventsView));
            Worker.DbProvider.list(collection);
            Assert.IsNotNull(collection);
            Assert.AreEqual(4, collection.Count);

            Data.CBO.eventsView event_ = (Data.CBO.eventsView) collection.get(2);
            Assert.AreEqual(2, event_.eventId);
            Assert.AreEqual(2, event_.peopleId);
            Assert.AreEqual(2, event_.placeId);
            Assert.AreEqual(2, event_.cityId);
            Assert.AreEqual("lima", event_.cityName);
            Assert.AreEqual("paco", event_.firstName);
            Assert.AreEqual("plaza de toros", event_.placeName);

            event_ = new Data.CBO.eventsView(3);
            Worker.DbProvider.load(event_);
            Assert.AreEqual(3, event_.eventId);
            Assert.AreEqual(3, event_.peopleId);
            Assert.AreEqual(3, event_.placeId);
            Assert.AreEqual(3, event_.cityId);
            Assert.AreEqual("buenos aires", event_.cityName);
            Assert.AreEqual("luis", event_.firstName);
            Assert.AreEqual("parque francia", event_.placeName);

        }

        #endregion
        #region "ConversationListViewTest"

        [Test]
        public void ConversationListViewTest()
        {

            TestWorker.ReloadDatabase();
            cboCollectionBase collection = new cboCollectionBase(typeof(Data.CBO.conversationView));
            Worker.DbProvider.list(collection);
            Assert.IsNotNull(collection);
            Assert.AreEqual(8, collection.Count);

            Data.CBO.conversationView message = (Data.CBO.conversationView)collection.get(1);
            Assert.AreEqual(1, message.conversationId);
            Assert.IsNotNull(message.activityId);
            Assert.IsNull(message.eventId);
            Assert.AreEqual(1, message.activityId);
            Assert.AreEqual("me anoto!", message.text);

            message = new Data.CBO.conversationView();
            message.messageId = 5;
            Worker.DbProvider.load(message);
            Assert.AreEqual(2, message.conversationId);
            Assert.IsNull(message.activityId);
            Assert.IsNotNull(message.eventId);
            Assert.AreEqual(1, message.eventId);
            Assert.AreEqual("para donde vamos?", message.text);

        }

        #endregion
        #region "ConversationStoreTest"

        [Test]
        public void ConversationStoreTest()
        {

            TestWorker.ReloadDatabase();
            // add new messages
            string messageId = string.Empty;
            string command = "CALL `storeConversationMessage` ('luis', 2, NULL, 'este es un mensaje de prueba'); ";
            Worker.DbProvider.exec(command, out messageId);
            Assert.AreEqual("9", messageId);
            
            TestWorker.ReloadDataFromDatabase();
            Assert.AreEqual(9, TestWorker.messages.Count);
        }

        #endregion
        #region "ActivityJoinTest"

        [Test]
        public void ActivityJoinTest()
        {

            TestWorker.ReloadDatabase();
            Data.CBO.joinCBO join = new Data.CBO.joinCBO();
            cboCollectionBase collection = new cboCollectionBase(typeof(Data.CBO.joinCBO));
            Worker.DbProvider.list(collection);
            Assert.AreEqual(0, collection.Count);
            // first one
            Data.CBO.peopleCBO people = (Data.CBO.peopleCBO)TestWorker.peoples.get(0);
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)TestWorker.activities.get(0);
            join.activityId = activity.id;
            join.peopleId = people.id;
            Worker.DbProvider.store(join);
            Worker.DbProvider.list(collection);
            Assert.AreEqual(1, collection.Count);
            // seccond one
            people = (Data.CBO.peopleCBO)TestWorker.peoples.get(1);
            activity = (Data.CBO.activityCBO)TestWorker.activities.get(1);
            join.activityId = activity.id;
            join.peopleId = people.id;
            Worker.DbProvider.store(join);
            collection.Clear();
            Worker.DbProvider.list(collection);
            Assert.AreEqual(2, collection.Count);
            // third one
            people = (Data.CBO.peopleCBO)TestWorker.peoples.get(1);
            activity = (Data.CBO.activityCBO)TestWorker.activities.get(0);
            join.activityId = activity.id;
            join.peopleId = people.id;
            Worker.DbProvider.store(join);
            collection.Clear();
            Worker.DbProvider.list(collection);
            Assert.AreEqual(3, collection.Count);
            // check the values
            cboCollectionBase joiners = new cboCollectionBase(typeof(Data.CBO.activityJoinView));
            Worker.DbProvider.list(joiners);
            Assert.AreEqual(3, joiners.Count);
            Data.CBO.activityJoinView joined = (Data.CBO.activityJoinView)joiners.get(0);
            Assert.AreEqual(1, joined.activityId);
            Assert.AreEqual(1, joined.peopleId);
            joined = (Data.CBO.activityJoinView)joiners.get(1);
            Assert.AreEqual(1, joined.activityId);
            Assert.AreEqual(2, joined.peopleId);
            joined = (Data.CBO.activityJoinView)joiners.get(2);
            Assert.AreEqual(2, joined.activityId);
            Assert.AreEqual(2, joined.peopleId);
            // delete the seccond one
            joined = (Data.CBO.activityJoinView)joiners.get(1);
            join.activityId = joined.activityId;
            join.peopleId = joined.peopleId;
            Worker.DbProvider.delete(join);
            joiners.Clear();
            Worker.DbProvider.list(joiners);
            Assert.AreEqual(2, joiners.Count);
            // remove the third one
            joined = (Data.CBO.activityJoinView)joiners.get(1);
            join.activityId = joined.activityId;
            join.peopleId = joined.peopleId;
            Worker.DbProvider.delete(join);
            joiners.Clear();
            Worker.DbProvider.list(joiners);
            Assert.AreEqual(1, joiners.Count);
            // remove the lastone
            joined = (Data.CBO.activityJoinView)joiners.get(0);
            join.activityId = joined.activityId;
            join.peopleId = joined.peopleId;
            Worker.DbProvider.delete(join);
            joiners.Clear();
            Worker.DbProvider.list(joiners);
            Assert.AreEqual(0, joiners.Count);

        }

        #endregion

    }

}
