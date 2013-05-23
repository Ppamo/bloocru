using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class sessionsView : userCBO
    {

        #region "Constructor"

        public sessionsView()
        {
            this.TableName = "sessionsView";
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "userId".Split(',');
        }

        #endregion

        public string key { get; set; }
        public DateTime timestamp { get; set; }
        public DateTime created { get; set; }
        public int cityId { get; set; }
        public int userId { get; set; }
        public string cityName { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double zoom { get; set; }

    }

    public class sessionsByLogin : sessionsView
    {

        public sessionsByLogin() : base() { }
        public sessionsByLogin(string login) : this()
        {
            this.login = login;
        }
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "login".Split(',');
        }

        #endregion

    }

}
