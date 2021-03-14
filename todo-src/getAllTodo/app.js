// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const {metricScope, Unit} = require("aws-embedded-metrics")
const DDB = new AWS.DynamoDB({apiVersion: "2012-10-08"})

// environment variables
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, MOCK_COGNITO_USERNAME}  = process.env

const options = {region: REGION}
AWS.config.update({region: REGION})

if (ENDPOINT_OVERRIDE !== "") {
    options.endpoint = ENDPOINT_OVERRIDE
}
if (ACCESS_KEY_ID !== "") {
    options.accessKeyId = ACCESS_KEY_ID
    options.secretAccessKey = SECRET_ACCESS_KEY
}

console.log("DocumentClient  ", JSON.stringify(options));

const docClient = new AWS.DynamoDB.DocumentClient(options)
// response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders},
})

// Get cognito username from claims
function getCognitoUsername(event){
    let authHeader = event.requestContext.authorizer;
    if (authHeader !== null)
    {
        if (MOCK_COGNITO_USERNAME !== "") {
            return MOCK_COGNITO_USERNAME
        }else{
            return authHeader.claims["cognito:username"];
        }
    }
    return null;

}

// Retrieve all the items by cognito-username
function getRecords(username) {
    let params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames:{
            "#username": "cognito-username"
        },
        ExpressionAttributeValues: {
            ":username": username
        }
    }

    console.log("put 1 ", JSON.stringify(params));
    //console.log("put 2 ", JSON.stringify(item_body));

    return docClient.query(params)
}

console.log("event start!!!!!!!!");

// Lambda Handler
exports.getAllToDoItem =
    metricScope(metrics =>
        async (event, context, callback) => {
            metrics.setNamespace('TodoApp')
            metrics.putDimensions({Service: "getAllTodo"})
            metrics.setProperty("RequestId", context.requestId)
            try {
                let username = getCognitoUsername(event);
                let data = await getRecords(username).promise()
                metrics.putMetric("Success", 1, Unit.Count)
                return response(200, data)
            } catch (err) {
                metrics.putMetric("Error", 1, Unit.Count)
                console.error(err.message);
                return response(400, {message: err.message})
            }
        }
    )
