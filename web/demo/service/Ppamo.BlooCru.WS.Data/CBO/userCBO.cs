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
        public userCBO(string login): this()
        {
            this.login = login;
        }
        public userCBO(int id): this()
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
        public string login { get; set; }
        public string password { get; set; }
        public string elogin { get; set; }
        public string email { get; set; }
        public int? sessionId { get; set; }

    }
}
