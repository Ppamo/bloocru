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
        public int userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime birthDate { get; set; }
        public string description { get; set; }
        public int roleId { get; set; }
        public string roleName { get; set; }
        public DateTime timestamp { get; set; }
        public DateTime created { get; set; }
        public int cityId { get; set; }
        public string cityName { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double zoom { get; set; }

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

    public class peopleById : peopleView
    {

        #region "Constructor"

        public peopleById() : base() { }
        public peopleById(int PeopleId)
            : this()
        {
            this.peopleId = PeopleId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "peopleId".Split(',');
        }

        #endregion

    }

}
