using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class eventsView : eventCBO
    {

        #region "Constructor"

        public eventsView()
        {
            this.TableName = "eventsView";
        }
        public eventsView(int eventId)
            : this()
        {
            this.id = eventId;
            this.eventId = eventId;
        }

        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }
        #endregion

        public int eventId { get; set; }
        public string placeName { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double zoom { get; set; }
        public int cityId { get; set; }
        public string cityName { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
}
