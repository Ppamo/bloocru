using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class eventCBO: cboBase
    {

        #region "Constructor"
        public eventCBO()
        {
            this.TableName = "event";
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
        #region "description"
        private string __description;
        public string description
        {
            get { return __description; }
            set { __description = value; }
        }
        #endregion
        #region "timestamp"
        private DateTime __timestamp;
        public DateTime timestamp
        {
            get { return __timestamp; }
            set { __timestamp = value; }
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
