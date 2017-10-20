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
            this.activityId = null;
            this.eventId = null;
            this.placeId = null;
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }
        #endregion

        public int id { get; set; }
        public int peopleId { get; set; }
        public int? activityId { get; set; }
        public int? eventId { get; set; }
        public int? placeId { get; set; }

    }
}
