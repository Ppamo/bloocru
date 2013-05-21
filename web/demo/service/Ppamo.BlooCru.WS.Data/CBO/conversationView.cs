using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class conversationView: messageCBO
    {

        #region "Constructor"

        public conversationView()
        {
            this.TableName = "conversationView";
        }
        public conversationView(int id) : this()
        {
            this.messageId = id;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "messageId".Split(',');
        }

        #endregion

        public int? eventId { get; set; }
        public int? activityId { get; set; }
        public int userId { get; set; }
        public int messageId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }

    public class conversationByFK: conversationCBO
    {

        #region "Constructor"

        public conversationByFK() : base() { }
        public conversationByFK(int eventId)
            : this()
        {
            this.eventId = eventId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "eventId,activityId".Split(',');
        }

        #endregion

    }

}
