Batch Processing Example
========================

This example shows how to use DynamoDB to Read/Write in Batches.

Requirements
============
1. Install Docker on your local machine (Docker for Mac, Docker for Windows, etc.)
2. Build the docker image
```
docker-compose build
```
3. Install the node_modules for local development
```
docker-compose run batch-utilities npm install
```


Usage
=====

Note: the following commands use the local DynamoDB. To use the AWS DynamoDB, append the following environment variables to the commands:

```
ENDPOINT='aws' AWS_ACCESS_KEY_ID='<access_key>' AWS_SECRET_ACCESS_KEY='<secret_key>' docker-compose ...
```

Create Table
------------
```
docker-compose run batch-utilities node create_table.js
```

Add Items 
---------
```
docker-compose run batch-utilities node add_items.js
```

Delete Items 
------------
```
docker-compose run batch-utilities node delete_items.js
```

Get Items 
------------
```
docker-compose run batch-utilities node get_items.js
```
