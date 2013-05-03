using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ppamo.DataProvider.MySql;
using Ppamo.Common.Util;

namespace Ppamo.BlooCru.Logic
{
    public class Worker
    {

        #region "DbProvider"

        private static provider __DBprovider;
        public static provider DbProvider
        {
            get
            {
                if (__DBprovider == null)
                {
                    string server = Utils.getStringConfigOrDefault("connection.server", string.Empty);
                    string user = Utils.getStringConfigOrDefault("connection.user", string.Empty);
                    string pass = Utils.getStringConfigOrDefault("connection.password", string.Empty);
                    string dbname = Utils.getStringConfigOrDefault("connection.dbname", string.Empty);
                    int port = Utils.getIntConfigOrDefault("connection.port", 3306);

                    if (string.IsNullOrEmpty(server) || string.IsNullOrEmpty(user) || string.IsNullOrEmpty(pass) || string.IsNullOrEmpty(dbname))
                    {
                        throw new Exception("app.config keys missing!");
                    }

                    __DBprovider = new provider(server, port, dbname, user, pass);
                }
                return __DBprovider;
            }
        }

        #endregion
        #region "CreateDataBaseStructure"
        public static void CreateDataBaseStructure()
        {
            Logger.log.Debug("Creating Database");
            string path = Utils.getStringConfigOrDefault("database.scriptPath");
            if (string.IsNullOrEmpty(path))
                throw new Exception("app.config 'database.scriptPath' key not found!");
            if (!System.IO.File.Exists(path))
                throw new Exception("file '" + path + "' not found! starting in " + System.Environment.CurrentDirectory);

            DbProvider.exec(System.IO.File.ReadAllText(Utils.getStringConfigOrDefault("database.scriptPath")));
        }
        #endregion

    }
}
