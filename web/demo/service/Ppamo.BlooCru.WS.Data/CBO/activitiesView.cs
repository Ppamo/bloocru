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



    public class activityJoinView : peopleCBO
    {

        #region "Constructor"

        public activityJoinView()
        {
            this.TableName = "activityJoinView";
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "activityId,peopleId".Split(',');
        }

        #endregion

        private new int id { get; set; }
        public int activityId { get; set; }
        public int peopleId { get; set; }

    }
}
