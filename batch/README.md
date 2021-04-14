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
docker-compose run batch-utility npm install
```


Usage
=====

docker-compose run batch-utility node utility.js [--debug] <add|delete|create|get>
