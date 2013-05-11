using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class conversationCBO: cboBase
    {

        #region "Constructor"
        public conversationCBO()
        {
            this.TableName = "conversation";
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }
        #endregion

        #region "id"
        private int __id;
        public int id
        {
            get { return __id; }
            set { __id = value; }
        }
        #endregion
        #region "userId"
        private int __userId;
        public int userId
        {
            get { return __userId; }
            set { __userId = value; }
        }
        #endregion
        #region "activityId"
        private int __activityId;
        public int activityId
        {
            get { return __activityId; }
            set { __activityId = value; }
        }
        #endregion
        #region "eventId"
        private int __eventId;
        public int eventId
        {
            get { return __eventId; }
            set { __eventId = value; }
        }
        #endregion
        #region "placeId"
        private int __placeId;
        public int placeId
        {
            get { return __placeId; }
            set { __placeId = value; }
        }
        #endregion

    }
}
