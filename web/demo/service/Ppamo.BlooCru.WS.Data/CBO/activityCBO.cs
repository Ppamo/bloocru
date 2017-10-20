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

        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime timestamp { get; set; }
        public int peopleId { get; set; }
        public int cityId { get; set; }

    }
}
