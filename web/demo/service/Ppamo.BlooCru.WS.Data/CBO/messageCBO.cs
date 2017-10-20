using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class messageCBO: cboBase
    {

        #region "Constructor"
        public messageCBO()
        {
            this.TableName = "message";
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
        public string text { get; set; }
        public DateTime timestamp { get; set; }
        public int conversationId { get; set; }

    }
}
