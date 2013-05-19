using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class peopleCBO: cboBase
    {

        #region "Constructor"
        public peopleCBO()
        {
            this.TableName = "people";
        }
        #endregion
        #region "PrimaryKeys"
        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }
        #endregion

        public int id { get; set; }
        public int userId { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
        public DateTime birthDate { get; set; }
        public string imageURI { get; set; }
        public int roleId { get; set; }
        public string description { get; set; }

    }
}
