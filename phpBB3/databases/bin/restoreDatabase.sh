#!/bin/bash

DATE=`date +%Y.%m.%d.%H.%M.%S`
DB_NAME='phpBB01'
DB_HOST=localhost
DB_PORT=3306
DB_USER=admin
DB_PASS=phpBB
PATH_BACKUPS='/home/development/svn/BlooCru/phpBB3/databases/backups'

cd $PATH_BACKUPS

if [ -f $1.tgz ]
then
	tar xzf $1.tgz 2>&1
	mysql -h $DB_HOST -P $DB_PORT -D $DB_NAME -u "$DB_USER" --password="$DB_PASS" -N < "$1.sql" 2>&1
	rm -f $1.sql
else
	echo "file not found"
fi


