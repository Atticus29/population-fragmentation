var AWS = require('aws-sdk');

function loadEnvFile() {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.resolve(__dirname, '.env');

    if (!fs.existsSync(envPath)) {
        return;
    }

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) {
            continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();

        if (!process.env[key]) {
            process.env[key] = value;
        }
    }
}

loadEnvFile();

AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    // accessKeyId default can be used while using the downloadable version of DynamoDB. 
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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