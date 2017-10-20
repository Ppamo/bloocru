using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class roleCBO: cboBase
    {

        #region "Constructor"

        public roleCBO()
        {
            this.TableName = "role";
        }
        public roleCBO(int id): this()
        {
            this.id = id;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }

        #endregion

        public int id { get; set; }
        public string name { get; set; }

    }
}
