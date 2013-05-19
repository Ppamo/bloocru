using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;

namespace Ppamo.BlooCru.WS.Data.CBO
{
    public class citiesView: placeCBO
    {

        #region "Constructor"

        public citiesView()
        {
            this.TableName = "citiesView";
        }
        public citiesView(int id): this()
        {
            this.id = id;
        }
        public citiesView(string name): this()
        {
            this.name = name;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "id".Split(',');
        }

        #endregion

        public int cityId { get; set; }
        public int placeId { get; set; }

    }

    public class cityByName : citiesView
    {

        #region "Constructor"

        public cityByName() : base() { }
        public cityByName(string name) : base(name) { }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "name".Split(',');
        }

        #endregion

    }

    public class cityByCityId : citiesView
    {

        #region "Constructor"

        public cityByCityId() : base() { }
        public cityByCityId(int cityId)
            : this()
        {
            this.cityId = cityId;
        }

        #endregion
        #region "PrimaryKeys"

        public override string[] PrimaryKeys()
        {
            return "cityId".Split(',');
        }

        #endregion

    }

}
