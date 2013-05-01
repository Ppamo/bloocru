using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class markCBO: cboBase
    {        

        #region "Constructor"
        public markCBO()
        {
            this.TableName = "mark";
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
        #region "title"
        private string __title;
        public string title
        {
            get { return __title; }
            set { __title = value; }
        }
        #endregion
        #region "placeId"
        private int __placeId;
        public int placeId
        {
            get { return __placeId; }
            set { __placeId = value; }
        }
        #endregion

    }
}
