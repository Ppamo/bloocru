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

        #region "userId"
        private int __userId;
        public int userId
        {
            get { return __userId; }
            set { __userId = value; }
        }
        #endregion
        #region "nameId"
        private int __nameId;
        public int nameId
        {
            get { return __nameId; }
            set { __nameId = value; }
        }
        #endregion
        #region "valueId"
        private int __valueId;
        public int valueId
        {
            get { return __valueId; }
            set { __valueId = value; }
        }
        #endregion

    }
}
