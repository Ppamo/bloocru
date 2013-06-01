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

    public class TestWorker
    {

        #region "Properties"

        public static cboCollectionBase cities = new cboCollectionBase(typeof(Data.CBO.cityCBO));
        public static cboCollectionBase places = new cboCollectionBase(typeof(Data.CBO.placeCBO));
        public static cboCollectionBase sessions = new cboCollectionBase(typeof(Data.CBO.sessionCBO));
        public static cboCollectionBase users = new cboCollectionBase(typeof(Data.CBO.userCBO));
        public static cboCollectionBase roles = new cboCollectionBase(typeof(Data.CBO.roleCBO));
        public static cboCollectionBase peoples = new cboCollectionBase(typeof(Data.CBO.peopleCBO));
        public static cboCollectionBase events = new cboCollectionBase(typeof(Data.CBO.eventCBO));
        public static cboCollectionBase activities = new cboCollectionBase(typeof(Data.CBO.activityCBO));
        public static cboCollectionBase conversations = new cboCollectionBase(typeof(Data.CBO.conversationCBO));
        public static cboCollectionBase messages = new cboCollectionBase(typeof(Data.CBO.messageCBO));
        public static SHA1 sha1 = new SHA1Managed();
        public static string DateTimeToStringFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss";
        public static DateTime databaseTime = DateTime.Now;

        #endregion

        #region "RecreateDatabase"

        public static void RecreateDatabase()
        {
            Worker.DbProvider.dropDataBase();
            Worker.DbProvider.createDataBase();
            Worker.CreateDataBaseStructure();
            Worker.CreateDataBaseLogic();
        }

        #endregion
        #region "PopulateTestData"

        public static void PopulateTestData()
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
            session.updated = DateTime.Now.AddHours(-24);
            session.key = Crypto.toSHA1(session.updated.ToString(DateTimeToStringFormat));
            session.cityId = 1;
            session = (Data.CBO.sessionCBO)sessions.store();
            session.updated = DateTime.Now.AddHours(-12);
            session.key = Crypto.toSHA1(session.updated.ToString(DateTimeToStringFormat));
            session.cityId = 2;
            session = (Data.CBO.sessionCBO)sessions.store();
            session.updated = DateTime.Now;
            session.key = Crypto.toSHA1(session.updated.ToString(DateTimeToStringFormat));
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
        public static void ReloadDataFromDatabase()
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

        public static void ReloadDatabase()
        {
            RecreateDatabase();
            PopulateTestData();
            ReloadDataFromDatabase();
        }

        #endregion

    }

}