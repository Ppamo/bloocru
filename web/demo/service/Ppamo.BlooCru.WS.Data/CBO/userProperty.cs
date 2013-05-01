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
            return "userId,userPropertyNameId,userPropertyValueId".Split(',');
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
        #region "userPropertyNameId"
        private int __userPropertyNameId;
        public int userPropertyNameId
        {
            get { return __userPropertyNameId; }
            set { __userPropertyNameId = value; }
        }
        #endregion
        #region "userPropertyValueId"
        private int __userPropertyValueId;
        public int userPropertyValueId
        {
            get { return __userPropertyValueId; }
            set { __userPropertyValueId = value; }
        }
        #endregion

    }
}
