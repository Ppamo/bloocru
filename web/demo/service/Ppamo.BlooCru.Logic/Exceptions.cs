using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.Common.DataProvider.DataBase;

namespace Ppamo.BlooCru.Logic
{

    #region "NonValidKeyException"

    public class NonValidKeyException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public NonValidKeyException() : base(301, "The navigation key is not valid") { }
    }

    #endregion
    #region "InvalidURIException"

    public class InvalidURIException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public InvalidURIException() : base(302, "invalid uri") { }
        public InvalidURIException(string uri) : base(302, "Invalid uri '" + uri.Trim() + "'") { }
    }

    #endregion
    #region "PeopleNotFoundException"

    public class PeopleNotFoundException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public PeopleNotFoundException() : base(303, "people not found") { }
        public PeopleNotFoundException(string login) : base(303, "people not found, login: '" + login + "'") { }
    }

    #endregion
    #region "CollectionLoadException"

    public class CollectionLoadException : cboException
    {
        public CollectionLoadException() : base(304, "problems listing data") { }
        public CollectionLoadException(cboCollectionBase collection) : base(304, "problems listing data to collection of '" + collection.TypeContained + "'") { }
    }

    #endregion
    #region "PlaceNotFoundException"

    public class PlaceNotFoundException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public PlaceNotFoundException() : base(305, "place not found") { }
    }

    #endregion
    #region "ActivityNotFoundException"

    public class ActivityNotFoundException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public ActivityNotFoundException() : base(306, "place not found") { }
    }

    #endregion
    #region "EventNotFoundException"

    public class EventNotFoundException : Ppamo.Common.DataProvider.DataBase.cboException
    {
        public EventNotFoundException() : base(307, "place not found") { }
    }

    #endregion

}
