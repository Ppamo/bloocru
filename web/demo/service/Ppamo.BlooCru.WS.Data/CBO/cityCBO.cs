using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class cityCBO: cboBase
    {

        #region "Constructor"

        public cityCBO()
        {
            this.TableName = "city";
        }
        public cityCBO(int id): this()
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
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double zoom { get; set; }

    }
}
