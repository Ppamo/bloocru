#!/bin/bash
 
### UTILS
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

writeDebug()
{
	if [ ! -z "$1" ]
	then
		if [ "$SCREENDEBUG" = "TRUE" ]
		then
			echo "[debug] $1"
		fi
		logMessageToDB "$1" "carga" "debug"
		if [ -f "$RUTA_LOGS" ]
		then
			echo "[debug] $1" >> "$RUTA_LOGS"
		fi
	fi
}

writeInfo()
{
	if [ ! -z "$1" ]
	then
		echo "[info] $1"
		logMessageToDB "$1" "carga" "info"
		if [ -f "$RUTA_LOGS" ]
		then
			echo "[info] $1" >> "$RUTA_LOGS"
		fi
	fi
}


writeError()
{
	if [ ! -z "$1" ]
	then
		echo "[error] $1"
		if [ "$LOGTODATABASE" = "TRUE" ]
		then
			logMessageToDB "$1" "carga" "error"
		fi
		if [ -f "$RUTA_LOGS" ]
		then
			echo "[error] $1" >> "$RUTA_LOGS"
		fi
	fi
}


logMessageToDB()
{
	formatedCommand=`echo $1 | tr \' ' '`
	tipo_log="$2"
	nivel_log="$3"
	load_id=$LOAD_ID
	if [ -z "$tipo_log" ]
	then
		tipo_log="general"
	fi
	if [ -z "$nivel_log" ]
	then 
		nivel_log="debug"
	fi
	if [ -z "$load_id" ]
	then
		load_id='null'
	fi

	echo "CALL SPWriteLog('"$tipo_log"','"$nivel_log"',"$load_id",'"$formatedCommand"') ;" > $TMPFile.deb
	logMessageToDBResponse=`mysql -h $DB_HOST -P $DB_PORT -D $DB -u "$DB_USER" --password="$DB_PASS" -N < $TMPFile.deb`
	rm -f "$TMPFile.deb"
}


trim()
{
    trimmed=$1
    trimmed=${trimmed%% }
    trimmed=${trimmed## }

    echo $trimmed
}


checkParameters()
{
	# create the log file if it does not exists
	if [ ! -z "$RUTA_LOGS" ]
	then
		touch $RUTA_LOGS
	fi
}