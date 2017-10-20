using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class userPeopleView : userCBO
    {

        #region "Constructor"

        public userPeopleView()
        {
            this.TableName = "userPeopleView";
        }
        public userPeopleView(string login): this()
        {
            this.login = login;
        }
        public userPeopleView(int userId)
            : this()
        {
            this.userId = userId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "userId".Split(',');
        }

        #endregion

        private new int id  { get; set; }
        #region "userId"

        public int userId
        {
            get
            {
                return this.id;
            }
            set
            {
                this.id = value;
            }
        }

        #endregion
        public int peopleId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime birthDate { get; set; }
        public int cityId  { get; set; }

    }
}
