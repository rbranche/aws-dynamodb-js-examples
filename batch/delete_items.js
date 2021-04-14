// delete_items.js
//
// Delete all items in the DynamoDB table
//
// Usage: node delete_items.js

'use strict';

const { v4: uuidv4 } = require('uuid');

const { BatchWriteItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient, tableName, chunkSize } = require("./dbclient.js");

const run = async () => {
    let items = [];
    let results = [];

    let scanParams = {
        TableName: tableName,
    };
    
    try {
        let data;

        do {
            data = await dbclient.send(new ScanCommand(scanParams));
            for (let element of data.Items) {
                items.push({
                    DeleteRequest : {
                        Key : {
                            uuid: element.uuid
                        }
                    }
                });

                // If we have reached our chunk size, send the request for deletion to the server
                if (items.length == chunkSize) {
                    const params = {RequestItems: {[tableName]: items}};
                    results.push(dbclient.send(new BatchWriteItemCommand(params)));
                    items = [];
                }
            }

            scanParams.ExclusiveStartKey = data.LastEvaluatedKey;
        }
        while (typeof data.LastEvaluatedKey != "undefined")
    } catch (err) {
        console.log("Error", err);
        return
    }

    // Send deletion request for any additional items left over
    if (items.length > 0) {
        const params = {RequestItems: {[tableName]: items}};
        results.push(dbclient.send(new BatchWriteItemCommand(params)));
    }

    for (let result of results) {
        try {
            const data = await result;
            console.log("Success, items deleted", data);
        } catch (err) {
            console.log("Error", err);
        }
    }
};
run();
