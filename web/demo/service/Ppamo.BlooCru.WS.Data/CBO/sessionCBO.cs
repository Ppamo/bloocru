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
            this.timestamp =  DateTime.MinValue;
            this.updated = DateTime.MinValue;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }

        #endregion

        public int id { get; set; }
        public string key { get; set; }
        public DateTime timestamp { get; set; }
        public DateTime updated { get; set; }
        public int cityId { get; set; }

    }

    public class sessionCBOByKey : sessionCBO
    {

        #region "Constructor"

        public sessionCBOByKey() : base() { }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "key".Split(',');
        }

        #endregion

    }
}
