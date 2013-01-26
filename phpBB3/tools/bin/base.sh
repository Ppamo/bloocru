#!/bin/bash

. config.sh


# # # # # # # # # # # # # #

executeMysql()
{
	formatedCommand=`echo $1 | tr \' ' '`
	writeDebug "ejecutando sql: $formatedCommand"
	echo "$1" > $TMPFile
	writeDebug "comando: mysql -h $DB_HOST -P $DB_PORT -D $DB -u $DB_USER --password=$DB_PASS"
	executeMysqlResponse=`mysql -h $DB_HOST -P $DB_PORT -D $DB -u "$DB_USER" --password="$DB_PASS" -N < "$TMPFile" 2>&1`
	executionExitCode=$?
	rm -f $TMPFile
	# check the execution exit code
	if [ $executionExitCode -ne 0 ]
	then
		writeError "problemas ejecutando comando mysql"
		writeError "detalles: $executeMysqlResponse"
		exit -5
	fi
	writeDebug "respuesta: $executeMysqlResponse"
}

# # # # # # # # # # # # # #

executeMysqlFile()
{
	writeDebug "ejecutando archivo: $1"
	writeDebug "comando: mysql -h $DB_HOST -P $DB_PORT -D $DB -u $DB_USER --password=$DB_PASS"
	executeMysqlResponse=`mysql -h $DB_HOST -P $DB_PORT -D $DB -u "$DB_USER" --password="$DB_PASS" -N < $1`
	executionExitCode=$?
	if [ $executionExitCode -ne 0 ]
	then
		writeError "problemas ejecutando archivo mysql"
		writeError "detalles: $executeMysqlResponse"
		exit -5
	fi
	writeDebug "respuesta: $executeMysqlResponse"
}

# # # # # # # # # # # # # #

writeError()
{
	if [ ! -z "$1" ]
	then
		echo "[error] $1"
		if [ -f "$RUTA_LOGS" ]
		then
			echo "[error] $1" >> "$RUTA_LOGS"
		fi
	fi
}

# # # # # # # # # # # # # #

writeDebug()
{
	if [ ! -z "$1" ]
	then
		if [ "$SCREENDEBUG" = "TRUE" ]
		then
			echo "[debug] $1"
		fi
		if [ -f "$LOGFile" ]
		then
			echo "[debug] $1" >> "$LOGFile"
		fi
	fi
}

# # # # # # # # # # # # # # # # #







