using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class joinCBO: cboBase
    {

        #region "Constructor"

        public joinCBO()
        {
            this.TableName = "join";
        }
        public joinCBO(int peopleId, int activityId): this()
        {
            this.peopleId = peopleId;
            this.activityId = activityId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "peopleId,activityId".Split(',');
        }

        #endregion

        public int peopleId { get; set; }
        public int activityId { get; set; }

    }
}
