using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Ppamo.BlooCru.RESTfulServer
{

    public partial class _Default : System.Web.UI.Page
    {

        #region "Page_Load"

        protected void Page_Load(object sender, EventArgs e)
        {

            if (!Page.IsPostBack)
            {
                // Response.WriteFile("JSonAdmin/JSonTestAdmin.html");
                Response.WriteFile("demo/index.php");
            }

        }

        #endregion

    }

}
