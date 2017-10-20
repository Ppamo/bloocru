using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ppamo.BlooCru.Logic;
using Ppamo.BlooCru.WS.Data.CBO;
using Ppamo.Common.Util;

namespace Ppamo.BlooCru.RESTfulServer
{

    public partial class _Default : System.Web.UI.Page
    {

        #region "Page_Load"

        static Table table = new Table();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Ppamo.Common.Util.Utils.getBoolConfigOrDefault("restfulserver.setup", false))
            {
                Page.Controls.Add(table);
                try
                {
                    debug("droping database");
                    Worker.DbProvider.dropDataBase();
                    debug("creating database");
                    Worker.DbProvider.createDataBase();
                    if (Worker.DbProvider.existsDataBase())
                        debug("the database was created");
                    else
                        debug("the database does not exists");
                    debug("loading structure");
                    Worker.CreateDataBaseStructure();
                    debug("loading logic");
                    Worker.CreateDataBaseLogic();
                    // add roles
                    createRole("capitan");
                    createRole("tripulante");
                    createRole("asistente");
                    // add city
                    createCity("santiago", -33.440, -70.638, 10);
                    createCity("lima", -12.059, -77.064, 10);
                    createCity("buenos aires", -34.603, -58.381, 9);
                    // add users
                    createUser("hugo", "pass.hugo", "hugo@disney.com", "hugo", "mcdonald", 1);
                    createUser("paco", "pass.paco", "paco@disney.com", "paco", "mcdonald", 2);
                    createUser("luis", "pass.luis", "luis@disney.com", "luis", "mcdonald", 3);

                    debug("done");
                }
                catch (Exception ex)
                {
                    error("exception", ex);
                }
            }
            else if(!Page.IsPostBack)
            {
                Response.WriteFile("demo/index.html");
                Response.Write("<script>worker.__provider.debugEnabled = " + Ppamo.Common.Util.Utils.getBoolConfigOrDefault("client.log", false).ToString().ToLower() + ";</script>");
                Response.OutputStream.Flush();
                Response.OutputStream.Close();
            }

        }

        #endregion

        #region "createUser"

        private void createUser(string login, string pass, string email,string firstName, string lastName, int roleId)
        {
            debug("adding user '" + login + "'");
            userCBO user = new userCBO(login);
            user.password = pass;
            user.elogin = Crypto.toSHA1(login);
            user.email = email;
            Worker.DbProvider.store(user);
            peopleCBO people = new peopleCBO();
            people.userId = user.id;
            people.firstName = firstName;
            people.lastName = lastName;
            people.roleId = roleId;
            Worker.DbProvider.store(people);
        }

        #endregion
        #region "createRole"

        private void createRole(string name)
        {
            debug("adding role '" + name + "'");
            roleCBO role = new roleCBO();
            role.name = name;
            Worker.DbProvider.store(role);
        }

        #endregion
        #region "createCity"

        private void createCity(string name, double latitude, double longitude, double zoom)
        {
            debug("adding city '" + name + "'");
            cityCBO city = new cityCBO();
            city.name = name;
            city.latitude = latitude;
            city.longitude = longitude;
            city.zoom = zoom;
            Worker.DbProvider.store(city);
        }

        #endregion

        #region "logger"

        private void log(string message)
        {
            TableRow row = new TableRow();
            TableCell cell = new TableCell();
            cell.Text = message;
            row.Cells.Add(cell);
            table.Rows.Add(row);
        }
        private void debug(string message)
        {
            log("debug: " + message);
        }
        private void error(string message, Exception e)
        {
            log("error: " + message);
            log("exception: " + e.Message);
        }

        #endregion

    }

}
