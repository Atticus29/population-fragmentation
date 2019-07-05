declare var require: any;

import { Injectable } from '@angular/core';

import { constants } from './constants';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  addItemToDB(lastName: string, googleSheetUrl: string, googleFormUrl: string): any{
    let AWS = require("aws-sdk");
    let subjRet = new Subject();
    subjRet.next(false);

    AWS.config.update({
      region: "us-east-1",
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
      });
    let docClient = new AWS.DynamoDB.DocumentClient();

    let table = "populationSimulatorRooms";

    let room = lastName; //TODO make this something the user inputs

    let params = {
        TableName:table,
        Item:{
            "room": room,
            "lastName": lastName,
            "googleSheetUrl": googleSheetUrl,
            "googleFormUrl": googleFormUrl
        }
    };
    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            console.log("got here hi");
            subjRet.next(true);
            // this.displaySuccess = true;
        }
    });
    return subjRet;
    // console.log("returnVal is " + returnVal);
    // return returnVal;
  }


  retrieveItemFromDb(room: string): any{
    let AWS = require("aws-sdk");
    let subjRet = new Subject();
    AWS.config.update({
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
    });
    // this.roomRetrieved = true;

    var docClient = new AWS.DynamoDB.DocumentClient();
    let table = "populationSimulatorRooms";
    let params = {
        TableName:table,
        KeyConditionExpression: "room = :rrrr",
        ExpressionAttributeValues: {
            ":rrrr": room
        }
    }
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.googleSheetUrl + ": " + item.googleFormUrl);
                let sheetUrl = item.googleSheetUrl;
                let formUrl = item.googleFormUrl;
                let returnItem = {sheetUrl, formUrl};
                subjRet.next(returnItem);
                // return();
                // self.configService.emitNewConfigVars([item.googleSheetUrl, item.googleFormUrl]);
                // self.introGoogleSheetUrl = item.googleSheetUrl;
                // self.introGoogleFormUrl = item.googleFormUrl;
            });
        }
    });
    return subjRet;
  }
}
