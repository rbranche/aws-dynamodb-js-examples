// get_items.js
//
// List all items in the DynamoDB table
//
// Usage: node get_items.js

'use strict';

const { v4: uuidv4 } = require('uuid');

const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient, tableName } = require("./dbclient.js");

const run = async () => {
    let scanParams = {
        TableName: tableName,
    };
    
    try {
        let data;
        let count = 0;

        do {
            data = await dbclient.send(new ScanCommand(scanParams));
            count += data.Items.length
            for (let element of data.Items) {
                console.log(element)
            }

            scanParams.ExclusiveStartKey = data.LastEvaluatedKey;
        }
        while (typeof data.LastEvaluatedKey != "undefined")

        console.log("Number of items: " + count)
    } catch (err) {
        console.log("Error", err);
        return
    }
};
run();
