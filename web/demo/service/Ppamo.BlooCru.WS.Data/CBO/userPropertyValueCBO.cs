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
        #region "value"
        private string __value;
        public string value
        {
            get { return __value; }
            set { __value = value; }
        }
        #endregion

    }
}
