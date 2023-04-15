#!/bin/bash

AWS_PROFILE="default"
AWS_REGION="us-east-2"

FUNCTION="test_function_js"

rm -rf dist

[ -d dist ] || mkdir dist

zip -r dist/$FUNCTION . -x dist

aws --profile $AWS_PROFILE  --region $AWS_REGION lambda update-function-code --function-name $FUNCTION --zip-file fileb://dist/$FUNCTION.zip
