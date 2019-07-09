declare var require: any;

import { Injectable } from '@angular/core';

import { constants } from './constants';
import { masterConfigProperties } from './masterConfiguration';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private AWS: any = require("aws-sdk");
  private table: string = "populationSimulatorRooms";

  constructor() {
    this.AWS.config.update({
      region: "us-east-1",
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
      });
  }

  addItemToDB(lastName: string, googleSheetUrl: string, googleFormUrl: string): BehaviorSubject<any>{
    let subjRet = new BehaviorSubject(null);
    console.log("current last name is " + lastName);
    if(lastName.length > 10){
      return subjRet; //TODO temporary block to prevent runaway
    }
    // subjRet.next(false);
    this.doesRoomAlreadyExist(lastName).subscribe(results =>{
      console.log("does entry already exist?" + results);
      if(results === true){
        console.log("not unique!");
        let newLastName = lastName + Math.floor(Math.random() * 9);
        console.log("new last name is " + newLastName);
        // subjRet.next(newLastName);
        this.addItemToDB(newLastName, googleSheetUrl, googleFormUrl);
      } else{
        console.log("good to go!");
        let room = lastName;
        let params = {
            TableName:this.table,
            Item:{
                "room": room,
                "lastName": lastName,
                "googleSheetUrl": googleSheetUrl,
                "googleFormUrl": googleFormUrl
            }
        };
        console.log("Adding a new item...");
        let docClient = new this.AWS.DynamoDB.DocumentClient();
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                subjRet.next(null);
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                subjRet.next(data.lastName);
            }
        });
      }
    });
    return subjRet;
  }

  doesRoomAlreadyExist(room: string): ReplaySubject<any>{
    console.log("got into doesRoomAlreadyExist method");
    let existStatus = new ReplaySubject();
    // existStatus.next(true);
    this.retrieveItemFromDb(room).subscribe(results=>{
      console.log("here are the retrieval results: " + results);
      if(results){
        existStatus.next(true);
      } else {
        existStatus.next(false);
      }
    });
    return existStatus;
  }


  retrieveItemFromDb(room: string): ReplaySubject<any>{
    console.log("got into retrieveItemFromDb method");
    // let sheetUrl = masterConfigProperties.googleSheetUrl;
    // let formUrl =  masterConfigProperties.googleFormUrl;
    // let tmpObj = {sheetUrl, formUrl};
    // let subjRet = new BehaviorSubject(tmpObj);
    let subjRet = new ReplaySubject(); //TODO stop this from emitting before retrieving but also this shouldn't emit null if it's eventually gonna have something
    this.AWS.config.update({
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
    });
    // this.roomRetrieved = true;
    let params = {
        TableName:this.table,
        KeyConditionExpression: "room = :rrrr",
        ExpressionAttributeValues: {
            ":rrrr": room
        }
    }
    let docClient = new this.AWS.DynamoDB.DocumentClient();
    docClient.query(params, function(err, data) {
      // console.log("data is " + data);
      // console.log("error is " + err);
      if (err || data.Items.length === 0) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          subjRet.next(null);
      } else {
          console.log("got here");
          console.log(data.Items.length);
          data.Items.forEach(function(item) {
            console.log("ok got here");
            console.log(item);
            console.log(" -", item.googleSheetUrl + ": " + item.googleFormUrl);
            let sheetUrl = item.googleSheetUrl;
            let formUrl = item.googleFormUrl;
            let returnItem = {sheetUrl, formUrl};
            subjRet.next(returnItem);
          });
      }
    });
    return subjRet;
  }
}
