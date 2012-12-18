#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server running Appoints app unit tests."
echo "-------------------------------------------------------------------"

testacular start $BASE_DIR/../test/testacular.app.conf.js $*
