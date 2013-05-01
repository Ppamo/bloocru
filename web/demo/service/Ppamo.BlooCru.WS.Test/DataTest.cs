using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using Ppamo.DataProvider.MySql;
using Ppamo.BlooCru.WS;

namespace Ppamo.BlooCru.WS.Test
{
    [TestFixture]
    public class DataTest
    {

        #region "Properties"
        private cboCollectionBase users = new cboCollectionBase(typeof(Data.CBO.userCBO));
        private cboCollectionBase places = new cboCollectionBase(typeof(Data.CBO.placeCBO));
        private cboCollectionBase marks = new cboCollectionBase(typeof(Data.CBO.markCBO));
        private cboCollectionBase notices = new cboCollectionBase(typeof(Data.CBO.noticeCBO));
        private cboCollectionBase events = new cboCollectionBase(typeof(Data.CBO.eventCBO));
        private cboCollectionBase userProperties = new cboCollectionBase(typeof(Data.CBO.userPropertyCBO));
        private cboCollectionBase userPropertiesNames = new cboCollectionBase(typeof(Data.CBO.userPropertyNameCBO));
        private cboCollectionBase userPropertiesValues = new cboCollectionBase(typeof(Data.CBO.userPropertyValueCBO));
        #endregion

        #region "RecreateDatabaseTest"
        [Test]
        public void RecreateDatabaseTest()
        {

            RecreateDatabase();
            Assert.IsTrue(Worker.DbProvider.existsDataBase());
            Assert.IsTrue(Worker.DbProvider.existsTable("user"));
            Assert.IsTrue(Worker.DbProvider.existsTable("place"));
            Assert.IsTrue(Worker.DbProvider.existsTable("mark"));
            Assert.IsTrue(Worker.DbProvider.existsTable("event"));
            Assert.IsTrue(Worker.DbProvider.existsTable("notice"));
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
            Assert.AreEqual(3, users.Count);
            Assert.AreEqual(9, userProperties.Count);
            Assert.AreEqual(3, userPropertiesNames.Count);
            Assert.AreEqual(5, userPropertiesValues.Count);
            Assert.AreEqual(3, places.Count);
            Assert.AreEqual(3, marks.Count);
            Assert.AreEqual(5, notices.Count);
            Assert.AreEqual(4, events.Count);

        }

        #endregion
        #region "CheckStoredDataTest"
        [Test]
        public void CheckStoredDataTest()
        {
            ReloadDatabase();
            // user
            Data.CBO.userCBO user = (Data.CBO.userCBO)users.get(1);
            Assert.AreEqual(2, user.id);
            Assert.AreEqual("paco", user.login);
            Assert.AreEqual("paco@disney.com", user.email);
            Assert.AreEqual("pass.paco", user.pass);
            // userProperty
            Data.CBO.userPropertyCBO userProperty = (Data.CBO.userPropertyCBO)userProperties.get(1);
            Assert.AreEqual(1, userProperty.userId);
            Assert.AreEqual(2, userProperty.userPropertyNameId);
            Assert.AreEqual(2, userProperty.userPropertyValueId);
            // userPropertyName
            Data.CBO.userPropertyNameCBO userPropertyName = (Data.CBO.userPropertyNameCBO)userPropertiesNames.get(1);
            Assert.AreEqual(2, userPropertyName.id);
            Assert.AreEqual("birthDate", userPropertyName.name);
            // userPropertyValue
            Data.CBO.userPropertyValueCBO userPropertyValue = (Data.CBO.userPropertyValueCBO)userPropertiesValues.get(1);
            Assert.AreEqual(2, userPropertyValue.id);
            Assert.AreEqual("2001-01-01", userPropertyValue.value);

            // place
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.get(1);
            Assert.AreEqual(2, place.id);
            Assert.AreEqual("lima", place.name);
            Assert.AreEqual(-12.059, place.latitude);
            Assert.AreEqual(-77.064, place.longitude);
            Assert.AreEqual(10, place.zoom);
            // mark
            Data.CBO.markCBO mark = (Data.CBO.markCBO)marks.get(1);
            Assert.AreEqual(2, mark.id);
            Assert.AreEqual("Buenos Aires, Argentina", mark.title);
            Assert.AreEqual(3, mark.placeId);
            // notice
            Data.CBO.noticeCBO notice = (Data.CBO.noticeCBO)notices.get(1);
            Assert.AreEqual(2, notice.id);
            Assert.AreEqual("carrete", notice.title);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", notice.description);
            Assert.AreEqual(new DateTime(2013, 04, 20, 13, 10, 0), notice.timestamp);
            Assert.AreEqual(2, notice.userId);
            // event
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.get(1);
            Assert.AreEqual(2, event_.id);
            Assert.AreEqual("juntemonos aca para ir bellavista en la noche", event_.description);
            Assert.AreEqual(new DateTime(2013, 04, 21, 15, 00, 0), event_.timestamp);
            Assert.AreEqual(2, event_.userId);
            Assert.AreEqual(2, event_.markId);

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

            // users
            users.Clear();
            Data.CBO.userCBO user = (Data.CBO.userCBO)users.store();
            user.login = "hugo";
            user.email = "hugo@disney.com";
            user.pass = "pass.hugo";
            user = (Data.CBO.userCBO)users.store();
            user.login = "paco";
            user.email = "paco@disney.com";
            user.pass = "pass.paco";
            user = (Data.CBO.userCBO)users.store();
            user.login = "luis";
            user.email = "luis@disney.com";
            user.pass = "pass.luis";
            // place 
            places.Clear();
            Data.CBO.placeCBO place = (Data.CBO.placeCBO)places.store();
            place.name = "santiago";
            place.latitude = -33.440;
            place.longitude = -70.638;
            place.zoom = 10;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "lima";
            place.latitude = -12.059;
            place.longitude = -77.064;
            place.zoom = 10;
            place = (Data.CBO.placeCBO)places.store();
            place.name = "buenos aires";
            place.latitude = -34.603;
            place.longitude = -58.381;
            place.zoom = 9;
            // mark
            marks.Clear();
            Data.CBO.markCBO mark = (Data.CBO.markCBO)marks.store();
            mark.title = "Santiago, Chile";
            mark.placeId = 1;
            mark = (Data.CBO.markCBO)marks.store();
            mark.title = "Buenos Aires, Argentina";
            mark.placeId = 3;
            mark = (Data.CBO.markCBO)marks.store();
            mark.title = "Lima, Peru";
            mark.placeId = 2;
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
            userProperty.userPropertyNameId = 1;
            userProperty.userPropertyValueId = 1;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 1;
            userProperty.userPropertyNameId = 2;
            userProperty.userPropertyValueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 1;
            userProperty.userPropertyNameId = 3;
            userProperty.userPropertyValueId = 3;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.userPropertyNameId = 1;
            userProperty.userPropertyValueId = 4;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.userPropertyNameId = 2;
            userProperty.userPropertyValueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 2;
            userProperty.userPropertyNameId = 2;
            userProperty.userPropertyValueId = 5;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.userPropertyNameId = 1;
            userProperty.userPropertyValueId = 1;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.userPropertyNameId = 2;
            userProperty.userPropertyValueId = 2;
            userProperty = (Data.CBO.userPropertyCBO)userProperties.store();
            userProperty.userId = 3;
            userProperty.userPropertyNameId = 3;
            userProperty.userPropertyValueId = 3;
            // notice
            notices.Clear();
            Data.CBO.noticeCBO notice = (Data.CBO.noticeCBO)notices.store();
            notice.title = "cine";
            notice.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            notice.timestamp = new DateTime(2013, 04, 20, 12, 13, 0);
            notice.userId = 1;
            notice = (Data.CBO.noticeCBO)notices.store();
            notice.title = "carrete";
            notice.description = "juntemonos aca para ir bellavista en la noche";
            notice.timestamp = new DateTime(2013, 04, 20, 13, 10, 0);
            notice.userId = 2;
            notice = (Data.CBO.noticeCBO)notices.store();
            notice.title = "shopping";
            notice.description = "vamos de shopping al centro";
            notice.timestamp = new DateTime(2013, 04, 20, 14, 0, 0);
            notice.userId = 3;
            notice = (Data.CBO.noticeCBO)notices.store();
            notice.title = "toros en la plaza";
            notice.description = "hay corrida de toros ma&ntilde;ana en la plaza acho";
            notice.timestamp = new DateTime(2013, 04, 20, 14, 30, 0);
            notice.userId = 2;
            notice = (Data.CBO.noticeCBO)notices.store();
            notice.title = "paseo esta tarde";
            notice.description = "damos una vuelta por la plaza";
            notice.timestamp = new DateTime(2013, 04, 20, 14, 45, 0);
            notice.userId = 3;
            // event
            events.Clear();
            Data.CBO.eventCBO event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n";
            event_.timestamp = new DateTime(2013, 04, 21, 14, 45, 0);
            event_.userId = 1;
            event_.markId = 1;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "juntemonos aca para ir bellavista en la noche";
            event_.timestamp = new DateTime(2013, 04, 21, 15, 00, 0);
            event_.userId = 2;
            event_.markId = 2;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "donde nos juntamos?";
            event_.timestamp = new DateTime(2013, 04, 21, 16, 00, 0);
            event_.userId = 3;
            event_.markId = 3;
            event_ = (Data.CBO.eventCBO)events.store();
            event_.description = "damos una vuelta por la plaza";
            event_.timestamp = new DateTime(2013, 04, 21, 17, 00, 0);
            event_.userId = 2;
            event_.markId = 3;

            // Store the data
            Worker.DbProvider.store(users);
            Worker.DbProvider.store(userPropertiesValues);
            Worker.DbProvider.store(userPropertiesNames);
            Worker.DbProvider.store(userProperties);
            Worker.DbProvider.store(places);
            Worker.DbProvider.store(marks);
            Worker.DbProvider.store(notices);
            Worker.DbProvider.store(events);

        }

        #endregion
        #region "ReloadDataFromDatabase"
        private void ReloadDataFromDatabase()
        {
            users.Clear();
            Worker.DbProvider.list(users);
            places.Clear();
            Worker.DbProvider.list(places);
            marks.Clear();
            Worker.DbProvider.list(marks);
            notices.Clear();
            Worker.DbProvider.list(notices);
            events.Clear();
            Worker.DbProvider.list(events);
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
