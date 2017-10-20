using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class userPropertyNameCBO: cboBase
    {

        #region "Constructor"
        public userPropertyNameCBO()
        {
            this.TableName = "userPropertyName";
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "name".Split(',');
        }
        #endregion

        public int id { get; set; }
        public string name { get; set; }

    }
}
