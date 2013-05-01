using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class userCBO: cboBase
    {

        #region "Constructor"
        public userCBO()
        {
            this.TableName = "user";
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
        #region "login"
        private string __login;
        public string login
        {
            get { return __login; }
            set { __login = value; }
        }
        #endregion
        #region "email"
        private string __email;
        public string email
        {
            get { return __email; }
            set { __email = value; }
        }
        #endregion
        #region "pass"
        private string __pass;
        public string pass
        {
            get { return __pass; }
            set { __pass = value; }
        }
        #endregion

    }
}
