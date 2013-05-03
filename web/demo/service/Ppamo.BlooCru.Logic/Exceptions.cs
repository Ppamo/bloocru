using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ppamo.BlooCru.Logic
{

    #region "Exceptions"

    #region "NonValidKeyException"
    public class NonValidKeyException : Exception
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

    #endregion

}
