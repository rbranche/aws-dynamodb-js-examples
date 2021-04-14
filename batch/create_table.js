// create_table.js
//
// Create the DynamoDB table
//
// Usage: node create_table.js

'use strict';

const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient, tableName } = require("./dbclient.js");

const run = async () => {
    const params = {
        AttributeDefinitions: [
            {
              AttributeName: "uuid",
              AttributeType: "S",
            },
        ],
        KeySchema: [
            {
              AttributeName: "uuid",
              KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        TableName: tableName,
        StreamSpecification: {
            StreamEnabled: false,
        },
    };

    try {
        const data = await dbclient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
    } catch (err) {
        console.log("Error", err);
    }
};
run();
