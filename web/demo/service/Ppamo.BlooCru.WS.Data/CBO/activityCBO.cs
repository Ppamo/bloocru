using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class activityCBO: cboBase
    {     

        #region "Constructor"
        public activityCBO()
        {
            this.TableName = "activity";
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
        #region "title"
        private string __title;
        public string title
        {
            get { return __title; }
            set { __title = value; }
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
        private DateTime __timestamp = DateTime.MinValue;
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

    }
}
