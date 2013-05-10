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
        #region "noticeId"
        private int __noticeId;
        public int noticeId
        {
            get { return __noticeId; }
            set { __noticeId = value; }
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
        #region "markId"
        private int __markId;
        public int markId
        {
            get { return __markId; }
            set { __markId = value; }
        }
        #endregion

    }
}
