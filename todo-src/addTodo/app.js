// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const { metricScope, Unit } = require("aws-embedded-metrics")
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" })
const { v1: uuidv1 } = require('uuid');

// environment variables
//const { TABLE_NAME, ENDPOINT_OVERRIDE, REGION } = process.env
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, MOCK_COGNITO_USERNAME}  = process.env
const options = { region: REGION }
AWS.config.update({ region: REGION })

if (ENDPOINT_OVERRIDE !== "") {
    options.endpoint = ENDPOINT_OVERRIDE
}
if (ACCESS_KEY_ID !== "") {
    options.accessKeyId = ACCESS_KEY_ID
    options.secretAccessKey = SECRET_ACCESS_KEY
}

console.log("DocumentClient options ", JSON.stringify(options));

const docClient = new AWS.DynamoDB.DocumentClient(options)
// response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

function isValidRequest(context, event) {
    return (event.body !== null)
}

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

function addRecord(event) {
/*

    let email = {
        "S": getCognitoUsername(event)
    }
    let usernameField = {
        "cognito-username": email
    }
*/
 
    let usernameField = {
        "cognito-username": getCognitoUsername(event)
    }


    // auto generated date fields
    let d = new Date()
    let dISO = d.toISOString()
    let auto_fields = {
        "id": uuidv1(),
        "creation_date": dISO,
        "lastupdate_date": dISO
    }
    // auto generated date fields

    //merge the json objects
    let item_body = {...usernameField, ...auto_fields, ...JSON.parse(event.body) }

    //console.log(item_body);
    
    //final params to DynamoDB
    const params = {
        TableName: TABLE_NAME,
        Item: item_body
    }


    console.log("put 1 ", JSON.stringify(params));
    console.log("put 2 ", JSON.stringify(item_body));

    return docClient.put(params)
}

// Lambda Handler
exports.addToDoItem =
    metricScope(metrics =>
        async (event, context, callback) => {
            metrics.setNamespace('TodoApp')
            metrics.putDimensions({ Service: "addTodo" })
            metrics.setProperty("RequestId", context.requestId)

            if (!isValidRequest(context, event)) {
                metrics.putMetric("Error", 1, Unit.Count)
                return response(400, { message: "Error: Invalid request" })
            }

            try {
                console.log("here 8")
                let data = await addRecord(event).promise()
                console.log("here 9")
                metrics.putMetric("Success", 1, Unit.Count)
                console.log("here 10")
                return response(200, data)
            } catch (err) {
                console.log("error ", err)
                metrics.putMetric("Error", 1, Unit.Count)
                return response(400, { message: err.message })
            }
        }
    )