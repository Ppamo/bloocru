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
            return "id".Split(',');
        }
        #endregion

        #region "id"
        private int __id;
        public int id
        {
            get { return __id; }
            set { __id = value; }
        }
        #endregion
        #region "name"
        private string __name;
        public string name
        {
            get { return __name; }
            set { __name = value; }
        }
        #endregion

    }
}
