using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class sessionCBO : cboBase
    {

        #region "Constructor"
        public sessionCBO()
        {
            this.TableName = "session";
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
        #region "key"
        private string __key;
        public string key
        {
            get { return __key; }
            set { __key = value; }
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
        #region "created"
        private DateTime __created = DateTime.MinValue;
        public DateTime created
        {
            get { return __created; }
            set { __created = value; }
        }
        #endregion

    }
}
