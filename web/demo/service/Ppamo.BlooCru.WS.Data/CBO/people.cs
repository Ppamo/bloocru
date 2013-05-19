using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{

    public class peopleView : cboBase
    {

        #region "Constructor"

        public peopleView()
        {
            this.TableName = "peopleView";
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "peopleId".Split(',');
        }

        #endregion

        public int peopleId { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public string roleName { get; set; }
        public int userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime birthDate { get; set; }
        public int roleId { get; set; }
        public string description { get; set; }

    }

    public class peopleByLogin : peopleView
    {

        #region "Constructor"

        public peopleByLogin(): base() { }
        public peopleByLogin(string login): this()
        {
            this.login = login;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "login".Split(',');
        }

        #endregion

    }

    public class peopleById : peopleView
    {

        #region "Constructor"

        public peopleById() : base() { }
        public peopleById(int peopleId)
            : this()
        {
            this.peopleId = peopleId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "peopleId".Split(',');
        }

        #endregion

    }

    public class peopleByUserId : peopleView
    {

        #region "Constructor"

        public peopleByUserId() : base() { }
        public peopleByUserId(int UserId)
            : this()
        {
            this.userId = UserId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "userId".Split(',');
        }

        #endregion

    }

}
