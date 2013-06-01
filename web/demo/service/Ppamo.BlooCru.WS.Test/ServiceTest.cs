using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using Ppamo.BlooCru.Logic;
using Ppamo.DataProvider.MySql;
using RESTData = Ppamo.RESTFulWebServer.Data;

namespace Ppamo.BlooCru.WS.Test
{

    [TestFixture]
    public class ServiceTest
    {

        #region "Properties"

        private Rules __serviceRules = new Rules();
        private List<RESTData.RESTFulUser> __users;

        #endregion

        #region "JoinLogicTest"

        [Test]
        public void JoinLogicTest()
        {

            TestWorker.ReloadDatabase();
            // check current data
            RESTData.RESTFulQuery query = CreateQuery("GET /{key}/activity/1/joined", 1);
            RESTData.RESTFulResponse response = __serviceRules.listJoinActivity(query);
            Assert.IsNotNull(response.responseCollection);
            Assert.AreEqual(0, response.responseCollection.Count);
            cboCollectionBase joined = new cboCollectionBase(typeof(Data.CBO.activityJoinView));
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(0, joined.Count);
            // join a people
            query = CreateQuery("GET /{key}/activity/1/join", 1);
            response = __serviceRules.joinActivity(query);
            joined.Clear();
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(1, joined.Count);
            // join a seccond people
            query = CreateQuery("GET /{key}/activity/1/join", 2);
            response = __serviceRules.joinActivity(query);
            joined.Clear();
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(2, joined.Count);
            // join to other activity
            query = CreateQuery("GET /{key}/activity/2/join", 1);
            response = __serviceRules.joinActivity(query);
            joined.Clear();
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(3, joined.Count);
            // unjoin the first one
            query = CreateQuery("GET /{key}/activity/1/unjoin", 1);
            response = __serviceRules.unjoinActivity(query);
            joined.Clear();
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(2, joined.Count);
            // unjoin a new one
            query = CreateQuery("GET /{key}/activity/2/unjoin", 1);
            response = __serviceRules.unjoinActivity(query);
            joined.Clear();
            Worker.DbProvider.list(joined);
            Assert.IsNotNull(joined);
            Assert.AreEqual(1, joined.Count);
            Data.CBO.activityJoinView join = (Data.CBO.activityJoinView)joined.get(0);
            Assert.AreEqual(1, join.activityId);
            Data.CBO.peopleView people = new Data.CBO.peopleView();
            people.peopleId = 2;
            Worker.DbProvider.load(people);
            Assert.AreEqual(people.firstName, join.firstName);
        }

        #endregion

        #region "Private Methods"

        #region "CreateQuery"

        private RESTData.RESTFulQuery CreateQuery(string uri, int userId)
        {
            __users = __serviceRules.GetUsers();
            RESTData.RESTFulQuery query = new RESTData.RESTFulQuery(uri);
            Data.CBO.userPeopleView people = new Data.CBO.userPeopleView(userId);
            Worker.DbProvider.load(people);
            BloocruRestUser user = new BloocruRestUser(people);
            query.session = new RESTData.RESTFulSession();
            query.session.user = user;
            return query;
        }

        #endregion

        #endregion

    }

}
