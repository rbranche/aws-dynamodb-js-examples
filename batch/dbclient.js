'use strict';

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = process.env.REGION || "us-west-2";

var ENDPOINT = process.env.ENDPOINT || null;

if (process.env.ENDPOINT == 'aws') {
    ENDPOINT = null;
}

exports.dbclient = new DynamoDBClient({ region: REGION, endpoint: ENDPOINT });
exports.tableName = "batchExample" 
