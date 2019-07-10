var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    // accessKeyId default can be used while using the downloadable version of DynamoDB. 
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    accessKeyId: "AKIASET6W74RUAEFRE5R",
    // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    secretAccessKey: "97JXUqKm7vb8auy31QNQwmDZHwHxBASSu8am2wVH"
});

var docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function(){
    let params = {
        TableName: "populationSimulatorRooms",
        Key:{
            "room": "testRoom"
        }
    };
    docClient.get(params, function(err,data){
        if(err){
            console.log("users::fetchOneByKey::error - "+ JSON.stringify(err, null, 2));
        }
        else{
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data,null,2));
        }
    });
};