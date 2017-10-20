using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class userPropertyCBO: cboBase
    {

        #region "Constructor"
        public userPropertyCBO()
        {
            this.TableName = "userProperty";
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "userId,nameId,valueId".Split(',');
        }
        #endregion

        public int userId { get; set; }
        public int nameId { get; set; }
        public int valueId { get; set; }

    }
}
