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
            return "login,email".Split(',');
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
        #region "epass"
        private string __epass;
        public string epass
        {
            get { return __epass; }
            set { __epass = value; }
        }
        #endregion
        #region "elogin"
        private string __elogin;
        public string elogin
        {
            get { return __elogin; }
            set { __elogin = value; }
        }
        #endregion

    }
}
