// add_items.js
//
// Add >101 additional items to the DynamoDB table 
//
// Usage: node add_items.js

const { v4: uuidv4 } = require('uuid');

const { BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient, tableName, chunkSize } = require("./dbclient.js");

const run = async () => {
    let results = [];

    for (let i = 0; i < Math.ceil((100 + 1) / chunkSize); i++) {
        let items = [];

        for (let k = 0; k < chunkSize; k++) {
            items.push({
                PutRequest: {
                    Item: {
                        uuid: { S: uuidv4() },
                        chunk_id: { N: ((i * 100) + k).toString() }
                    }
                }
            });
        }

        const params = {RequestItems: {[tableName]: items}};

        results.push(dbclient.send(new BatchWriteItemCommand(params)));
    }

    for (result of results) {
        try {
            const data = await result;
            console.log("Success, items inserted", data);
        } catch (err) {
            console.log("Error", err);
        }
    }
};
run();
