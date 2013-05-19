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

        public int id { get; set; }
        public string description { get; set; }
        public DateTime timestamp { get; set; }
        public int userId { get; set; }
        public int placeId { get; set; }

    }
}
