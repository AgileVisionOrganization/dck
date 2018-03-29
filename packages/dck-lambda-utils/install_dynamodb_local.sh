#!/usr/bin/env bash
if [ ! -d ./DynamoDBLocal_lib ] || [ ! -f ./DynamoDBLocal.jar ]; then
    wget https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.zip
    unzip -o dynamodb_local_latest.zip DynamoDBLocal.jar DynamoDBLocal_lib/*
    rm dynamodb_local_latest.zip
fi
