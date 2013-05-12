using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ppamo.BlooCru.Logic
{

    #region "Exceptions"

    #region "NonValidKeyException"
    public class NonValidKeyException : Ppamo.Common.DataProvider.DataBase.cboException
    {

        #region "Construtor"

        public NonValidKeyException()
        {
            this.__message = "The navigation key is not valid";
        }

        #endregion
        #region "Message"
        private string __message;
        public override string Message
        {
            get
            {
                return __message;
            }
        }
        #endregion

    }
    #endregion
    #region "InvalidURIException"
    public class InvalidURIException : Ppamo.Common.DataProvider.DataBase.cboException
    {

        #region "Construtor"

        public InvalidURIException()
        {
            this.__message = "Invalid uri";
        }
        public InvalidURIException(string uri)
        {
            this.__message = "Invalid uri '" + uri.Trim() + "'";
        }

        #endregion
        #region "Message"
        private string __message;
        public override string Message
        {
            get
            {
                return __message;
            }
        }
        #endregion

    }
    #endregion

    #endregion

}
