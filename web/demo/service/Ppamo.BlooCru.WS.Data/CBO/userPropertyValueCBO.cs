using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class userPropertyValueCBO: cboBase
    {

        #region "Constructor"
        public userPropertyValueCBO()
        {
            this.TableName = "userPropertyValue";
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "value".Split(',');
        }
        #endregion

        public int id { get; set; }
        public string value { get; set; }

    }
}
