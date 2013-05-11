using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class placeCBO: cboBase
    {

        #region "Constructor"
        public placeCBO()
        {
            this.TableName = "place";
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
        #region "name"
        private string __name;
        public string name
        {
            get { return __name; }
            set { __name = value; }
        }
        #endregion
        #region "latitude"
        private double __latitude;
        public double latitude
        {
            get { return __latitude; }
            set { __latitude = value; }
        }
        #endregion
        #region "longitude"
        private double __longitude;
        public double longitude
        {
            get { return __longitude; }
            set { __longitude = value; }
        }
        #endregion
        #region "zoom"
        private double __zoom;
        public double zoom
        {
            get { return __zoom; }
            set { __zoom = value; }
        }
        #endregion
        #region "showMark"
        private Boolean __showMark;
        public Boolean showMark
        {
            get { return __showMark; }
            set { __showMark = value; }
        }
        #endregion

    }
}
