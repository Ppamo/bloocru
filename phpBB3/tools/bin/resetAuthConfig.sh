#!/bin/bash

. base.sh



echo "reset values"
executeMysql "UPDATE phpbb_config SET config_value = \"db\" WHERE config_name = \"auth_method\" LIMIT 1;"

echo "show values"
executeMysql "SELECT * FROM  phpbb_config;"

echo ""
printf "%30s - %40s - %15s\n" "config name" "config value" "is dynamic"
IFS=$'\n'
for i in $executeMysqlResponse
do
	IFS=$'\t'
	ARRAY=($i)
	# printf "%30s - %40s - %15s\n" ${ARRAY[0]} ${ARRAY[1]} ${ARRAY[2]}
	echo "${ARRAY[0]},${ARRAY[1]},${ARRAY[2]}"
done



