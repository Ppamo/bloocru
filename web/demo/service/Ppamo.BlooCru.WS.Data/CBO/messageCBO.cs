using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class messageCBO: cboBase
    {

        #region "Constructor"
        public messageCBO()
        {
            this.TableName = "message";
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
        #region "userid"
        private int __userid;
        public int userid
        {
            get { return __userid; }
            set { __userid = value; }
        }
        #endregion
        #region "text"
        private string __text;
        public string text
        {
            get { return __text; }
            set { __text = value; }
        }
        #endregion
        #region "timestamp"
        private DateTime __timestamp = DateTime.MinValue;
        public DateTime timestamp
        {
            get { return __timestamp; }
            set { __timestamp = value; }
        }
        #endregion
        #region "conversationId"
        private int __conversationId;
        public int conversationId
        {
            get { return __conversationId; }
            set { __conversationId = value; }
        }
        #endregion

    }
}
