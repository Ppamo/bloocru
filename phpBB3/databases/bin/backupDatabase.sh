#!/bin/bash

DATE=`date +%Y.%m.%d.%H.%M.%S`
DB_NAME='phpBB01'
DB_HOST=localhost
DB_PORT=3306
DB_USER=admin
DB_PASS=phpBB
PATH_BACKUPS='/home/development/svn/BlooCru/phpBB3/databases/backups'

cd $PATH_BACKUPS
mysqldump --host $DB_HOST --port=$DB_PORT --user=$DB_USER --password="$DB_PASS" --databases $DB_NAME > $DATE.sql
tar czf $DATE.tgz $DATE.sql 2>&1
rm -f $DATE.sql


