#!/bin/bash
 
DB=BlooCru
USER=bloocru
PASS=verdad11
HOST=localhost
OUTPUT=output.log
 
# create the user if it does not exists
mysql -h localhost -D mysql -u root --password -e "CREATE USER '$USER'@'%' IDENTIFIED BY '$PASS';" 

# create the database if it does not exists

# run the structure script

# run the logic script

# run base data script




# update the stores procedures
# echo "update the stores procedures"
# mysql -h $HOST -D $DB -u "$USER" --password="$PASS" -B < ivr_data_storedprocedures.sql > $OUTPUT

# test the stored procedures
# echo "test the customers stored procedures" > $OUTPUT
# mysql -h $HOST -D $DB -u "$USER" --password="$PASS" < ivr_data_test_customer_logic.sql >> $OUTPUT
# cat $OUTPUT

# echo "test the logic stored procedures" > $OUTPUT
# mysql -h $HOST -D $DB -u "$USER" --password="$PASS" < ivr_data_test_data_logic.sql >> $OUTPUT
# cat $OUTPUT

