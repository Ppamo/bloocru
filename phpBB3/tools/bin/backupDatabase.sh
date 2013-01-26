#!/bin/bash

. config.sh
DATE=`date +%Y.%m.%d.%H.%M.%S`

cd $DB_BACKUPSDIR
mysqldump --host $DB_HOST --port=$DB_PORT --user=$DB_USER --password="$DB_PASS" --databases $DB_NAME > $DATE.sql
tar czf $DATE.tgz $DATE.sql 2>&1
rm -f $DATE.sql


