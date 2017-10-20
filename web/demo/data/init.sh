#!/bin/bash
 
### LOAD BASE SCRIPTS
. /etc/init.d/functions
. /opt/BellJobs/bin/ivr_ctl.config
 
# create the user if it does not exists
mysql -h localhost -D mysql -u root --password -e "CREATE USER '$USER'@'%' IDENTIFIED BY '$PASS';" 

# create the database if it does not exists

# run the structure script

# run the logic script

# run base data script
