using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class activitiesView: activityCBO
    {     

        #region "Constructor"

        public activitiesView()
        {
            this.TableName = "activitiesView";
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "activityId".Split(',');
        }

        #endregion

        public int activityId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
}
