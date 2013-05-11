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
        private cboCollectionBase sessions = new cboCollectionBase(typeof(Data.CBO.sessionCBO));
        private cboCollectionBase users = new cboCollectionBase(typeof(Data.CBO.userCBO));
        private cboCollectionBase places = new cboCollectionBase(typeof(Data.CBO.placeCBO));
        private cboCollectionBase activities = new cboCollectionBase(typeof(Data.CBO.activityCBO));
        private cboCollectionBase events = new cboCollectionBase(typeof(Data.CBO.eventCBO));
        private cboCollectionBase conversations = new cboCollectionBase(typeof(Data.CBO.conversationCBO));
        private cboCollectionBase messages = new cboCollectionBase(typeof(Data.CBO.messageCBO));
        private cboCollectionBase userProperties = new cboCollectionBase(typeof(Data.CBO.userPropertyCBO));
        private cboCollectionBase userPropertiesNames = new cboCollectionBase(typeof(Data.CBO.userPropertyNameCBO));
        private cboCollectionBase userPropertiesValues = new cboCollectionBase(typeof(Data.CBO.userPropertyValueCBO));
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
            Assert.IsTrue(Worker.DbProvider.existsTable("session"));
            Assert.IsTrue(Worker.DbProvider.existsTable("user"));
            Assert.IsTrue(Worker.DbProvider.existsTable("place"));
            Assert.IsTrue(Worker.DbProvider.existsTable("activity"));
            Assert.IsTrue(Worker.DbProvider.existsTable("event"));
            Assert.IsTrue(Worker.DbProvider.existsTable("conversation"));
            Assert.IsTrue(Worker.DbProvider.existsTable("message"));
            Assert.IsTrue(Worker.DbProvider.existsTable("userProperty"));
            Assert.IsTrue(Worker.DbProvider.existsTable("userPropertyName"));
            Assert.IsTrue(Worker.DbProvider.existsTable("userPropertyValue"));

        }

        #endregion
        #region "ReloadDataTest"
        [Test]
        public void ReloadDataTest()
        {

            ReloadDatabase();
            Assert.AreEqual(3, sessions.Count);
            Assert.AreEqual(3, users.Count);
            Assert.AreEqual(3, places.Count);
            Assert.AreEqual(5, activities.Count);
            Assert.AreEqual(4, events.Count);
            Assert.AreEqual(3, conversations.Count);
            Assert.AreEqual(8, messages.Count);
            Assert.AreEqual(9, userProperties.Count);
            Assert.AreEqual(3, userPropertiesNames.Count);
            Assert.AreEqual(5, userPropertiesValues.Count);

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
            Assert.AreEqual(Crypto.toSHA1("pass.paco"), user.epass);
            // place
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.get(1);
            Assert.AreEqual(2, place.id);
            Assert.AreEqual("lima", place.name);
            Assert.AreEqual(-12.059, place.latitude);
            Assert.AreEqual(-77.064, place.longitude);
            Assert.AreEqual(10, place.zoom);
            Assert.AreEqual(false, place.showMark);
            // activity
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)activities.get(1);
            Assert.AreEqual(2, activity.id);
            Assert.AreEqual("carrete", activity.title);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", activity.description);
            Assert.AreEqual(new DateTime(2013, 04, 20, 13, 10, 0), activity.timestamp);
            Assert.AreEqual(2, activity.userId);
            // event
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.get(1);
            Assert.AreEqual(2, event_.id);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", event_.description);
            Assert.AreEqual(new DateTime(2013, 04, 21, 15, 00, 0), event_.timestamp);
            Assert.AreEqual(2, event_.userId);
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
            // userProperty
            Data.CBO.userPropertyCBO userProperty = (Data.CBO.userPropertyCBO)userProperties.get(1);
            Assert.AreEqual(1, userProperty.userId);
            Assert.AreEqual(2, userProperty.nameId);
            Assert.AreEqual(2, userProperty.valueId);
            // userPropertyName
            Data.CBO.userPropertyNameCBO userPropertyName = (Data.CBO.userPropertyNameCBO)userPropertiesNames.get(1);
            Assert.AreEqual(2, userPropertyName.id);
            Assert.AreEqual("birthDate", userPropertyName.name);
            // userPropertyValue
            Data.CBO.userPropertyValueCBO userPropertyValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.get(1);
            Assert.AreEqual(2, userPropertyValue.id);
            Assert.AreEqual("2001-01-01", userPropertyValue.value);

        }
        #endregion

        #region "Private Methods"

        #region "RecreateDatabase"

        private void RecreateDatabase()
        {
            Worker.DbProvider.dropDataBase();
            Worker.DbProvider.createDataBase();
            Worker.CreateDataBaseStructure();
        }

        #endregion
        #region "PopulateTestData"

        private void PopulateTestData()
        {
            string now = string.Empty;
            Worker.DbProvider.exec("SELECT NOW();", out now);
            databaseTime = Utils.getDateFromMask(now);

            // sessions
            sessions.Clear();
            Data.CBO.sessionCBO session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now.AddHours(-24);
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now.AddHours(-12);
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            session = (Data.CBO.sessionCBO)sessions.store();
            session.created = DateTime.Now;
            session.key = Crypto.toSHA1(session.created.ToString(DateTimeToStringFormat));
            // users
            users.Clear();
            Data.CBO.userCBO user = (Data.CBO.userCBO)users.store();
            user.login = "hugo";
            user.email = "hugo@disney.com";
            user.epass = Crypto.toSHA1("pass.hugo");
            user.elogin = Crypto.toSHA1(user.login);
            user = (Data.CBO.userCBO)users.store();
            user.login = "paco";
            user.email = "paco@disney.com";
            user.epass = Crypto.toSHA1("pass.paco");
            user.elogin = Crypto.toSHA1(user.login);
            user = (Data.CBO.userCBO)users.store();
            user.login = "luis";
            user.email = "luis@disney.com";
            user.epass = Crypto.toSHA1("pass.luis");
            user.elogin = Crypto.toSHA1(user.login);
            // place 
            places.Clear();
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.store();
            place.name = "santiago";
            place.latitude = -33.440;
            place.longitude = -70.638;
            place.zoom = 10;
            place.showMark = true;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "lima";
            place.latitude = -12.059;
            place.longitude = -77.064;
            place.zoom = 10;
            place.showMark = false;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "buenos aires";
            place.latitude = -34.603;
            place.longitude = -58.381;
            place.zoom = 9;
            place.showMark = true;
            // activities
            activities.Clear();
            Data.CBO.activityCBO activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "cine";
            activity.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            activity.timestamp = new DateTime(2013, 04, 20, 12, 13, 0);
            activity.userId = 1;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "carrete";
            activity.description = "juntemonos aca para ir bellavista en la noche";
            activity.timestamp = new DateTime(2013, 04, 20, 13, 10, 0);
            activity.userId = 2;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "shopping";
            activity.description = "vamos de shopping al centro";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 0, 0);
            activity.userId = 3;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "toros en la plaza";
            activity.description = "hay corrida de toros ma&ntilde;ana en la plaza acho";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 30, 0);
            activity.userId = 2;
            activity = (Data.CBO.activityCBO)activities.store();
            activity.title = "paseo esta tarde";
            activity.description = "damos una vuelta por la plaza";
            activity.timestamp = new DateTime(2013, 04, 20, 14, 45, 0);
            activity.userId = 3;
            // event
            events.Clear();
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            event_.timestamp = new DateTime(2013, 04, 21, 14, 45, 0);
            event_.userId = 1;
            event_.placeId = 1;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "juntemonos aca para ir bellavista en la noche";
            event_.timestamp = new DateTime(2013, 04, 21, 15, 00, 0);
            event_.userId = 2;
            event_.placeId = 2;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "donde nos juntamos?";
            event_.timestamp = new DateTime(2013, 04, 21, 16, 00, 0);
            event_.userId = 3;
            event_.placeId = 3;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "damos una vuelta por la plaza";
            event_.timestamp = new DateTime(2013, 04, 21, 17, 00, 0);
            event_.userId = 2;
            event_.placeId = 3;
            // conversation
            conversations.Clear();
            Data.CBO.conversationCBO conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.userId = 1;
            conversation.activityId = 1;
            conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.userId = 2;
            conversation.eventId = 1;
            conversation = (Data.CBO.conversationCBO)conversations.store();
            conversation.userId = 3;
            conversation.activityId = 1;
            // messages
            messages.Clear();
            Data.CBO.messageCBO message = (Data.CBO.messageCBO)messages.store();
            message.userid = 1;
            message.conversationId = 1;
            message.text = "Nos juntamos para ir al cine a ls 8pm en recepción?";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 2;
            message.conversationId = 1;
            message.text = "me anoto!";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 1;
            message.conversationId = 1;
            message.text = "excelente...";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 2;
            message.conversationId = 2;
            message.text = "juntemonos aca para ir bellavista en la noche";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 3;
            message.conversationId = 2;
            message.text = "para donde vamos?";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 1;
            message.conversationId = 2;
            message.text = "pio nono";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 3;
            message.conversationId = 3;
            message.text = "vamos de shopping al centro";
            message = (Data.CBO.messageCBO)messages.store();
            message.userid = 2;
            message.conversationId = 3;
            message.text = "vamos";
            // user property name
            userPropertiesNames.Clear();
            Data.CBO.userPropertyNameCBO userPropertiesName = (Data.CBO.userPropertyNameCBO)userPropertiesNames.store();
            userPropertiesName.name = "lastConnection";
            userPropertiesName = (Data.CBO.userPropertyNameCBO)userPropertiesNames.store();
            userPropertiesName.name = "birthDate";
            userPropertiesName = (Data.CBO.userPropertyNameCBO)userPropertiesNames.store();
            userPropertiesName.name = "lastPlace";
            // user property name
            userPropertiesValues.Clear();
            Data.CBO.userPropertyValueCBO userPropertiesValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.store();
            userPropertiesValue.value = "2013-04-05";
            userPropertiesValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.store();
            userPropertiesValue.value = "2001-01-01";
            userPropertiesValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.store();
            userPropertiesValue.value = "2";
            userPropertiesValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.store();
            userPropertiesValue.value = "2013-04-07";
            userPropertiesValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.store();
            userPropertiesValue.value = "2001-05-04";
            // user property
            userProperties.Clear();
            Data.CBO.userPropertyCBO userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 1;
            userProperty.nameId = 1;
            userProperty.valueId = 1;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 1;
            userProperty.nameId = 2;
            userProperty.valueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 1;
            userProperty.nameId = 3;
            userProperty.valueId = 3;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.nameId = 1;
            userProperty.valueId = 4;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.nameId = 2;
            userProperty.valueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.nameId = 2;
            userProperty.valueId = 5;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.nameId = 1;
            userProperty.valueId = 1;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.nameId = 2;
            userProperty.valueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.nameId = 3;
            userProperty.valueId = 3;

            // Store the data
            Worker.DbProvider.store(sessions);
            Worker.DbProvider.store(users);
            Worker.DbProvider.store(places);
            Worker.DbProvider.store(activities);
            Worker.DbProvider.store(events);
            Worker.DbProvider.store(conversations);
            Worker.DbProvider.store(messages);
            Worker.DbProvider.store(userPropertiesValues);
            Worker.DbProvider.store(userPropertiesNames);
            Worker.DbProvider.store(userProperties);

        }

        #endregion
        #region "ReloadDataFromDatabase"
        private void ReloadDataFromDatabase()
        {
            sessions.Clear();
            Worker.DbProvider.list(sessions);
            users.Clear();
            Worker.DbProvider.list(users);
            places.Clear();
            Worker.DbProvider.list(places);
            activities.Clear();
            Worker.DbProvider.list(activities);
            events.Clear();
            Worker.DbProvider.list(events);
            conversations.Clear();
            Worker.DbProvider.list(conversations);
            messages.Clear();
            Worker.DbProvider.list(messages);
            userProperties.Clear();
            Worker.DbProvider.list(userProperties);
            userPropertiesNames.Clear();
            Worker.DbProvider.list(userPropertiesNames);
            userPropertiesValues.Clear();
            Worker.DbProvider.list(userPropertiesValues);
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
