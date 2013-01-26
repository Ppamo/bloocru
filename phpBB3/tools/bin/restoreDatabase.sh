#!/bin/bash

. config.sh

cd $DB_BACKUPSDIR

if [ -f $1.tgz ]
then
	tar xzf $1.tgz 2>&1
	mysql -h $DB_HOST -P $DB_PORT -D $DB_NAME -u "$DB_USER" --password="$DB_PASS" -N < "$1.sql" 2>&1
	rm -f $1.sql
else
	echo "file not found"
fi


