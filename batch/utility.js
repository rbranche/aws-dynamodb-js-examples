// utility.js
//
// Batch add/delete utility example
//
// Usage: node utility.js [--debug] <add|delete|create|get>

'use strict';

const {
    DynamoDBClient,
    BatchExecuteStatementCommand,
    CreateTableCommand,
} = require("@aws-sdk/client-dynamodb")

const DB_ENDPOINT = process.env.DB_ENDPOINT || null 

const COMMANDS = {
    add: addItems,
    get: getItems,
    delete: deleteItems,
    create: createTable,
}


function createTable(client) {
    /*
    var params = {
        TableName: 'batch-example',
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'N',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    }
    const command = new CreateTableCommand(params)

    await client.send(command)
    */
    console.log("Create Table...")
    return 0
}

function addItems(client) {
    /*
    const params = {
        // input parameters
    }
    const command = new BatchExecuteStatementCommand(params)
    await client.send(command)
    */

    console.log("Add Items...")
    return 0
}

function deleteItems(client) {
    console.log("Delete Items...")
    return 0
}

function getItemsBase(client) {
    console.log("Get Items...")
    return 0
}

function getItems(client) {
    items = getItemsBase(client)

    for (item of items) {
        console.log(item)
    }
}


function main() {
    var argv = process.argv.slice(2)
    var bad_parameters = false
    var command_parameter = null

    // Check command-line parameters
    if (argv.length == 0 || argv.length > 2) {
        bad_parameters = true
    } else if (argv.length == 2) {
        if (argv[0] != "--debug") {
            bad_parameters = true
        } else {
            command_parameter = argv[1]
        }
    } else {
        // Replace debug function with an empty one because we don't want debug logging
        console.debug = function() {}
        command_parameter = argv[0]
    }

    console.debug("command_parameter = " + command_parameter)

    if (!(command_parameter in COMMANDS)) {
        bad_parameters = true
    }

    if (bad_parameters) {
        console.error("Usage: node utility.js [--debug] <add|delete|create|get>")
        return 2
    }

    console.debug("DB_ENDPOINT = " + DB_ENDPOINT)
    console.debug("argv = " + argv)
    console.log("Command given: " + command_parameter)

    const client = new DynamoDBClient({ region: process.env.REGION, endpoint: DB_ENDPOINT}, );

    try {
        // Run the given command
        COMMANDS[command_parameter](client)
    } catch(err) {
        console.error("Failed: " + err)
        return 1
    }

    return 0
}




if (require.main === module) {
    process.exit(main())
}
