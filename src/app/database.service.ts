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
  dbDisplayName: BehaviorSubject<string> = new BehaviorSubject(null);
  studentEnteredRoomName: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() {
    this.AWS.config.update({
      region: "us-east-1",
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
      });
    // let self = this;
  }

  emitRoomName(name:string){
    this.studentEnteredRoomName.next(name);
  }

  addItemToDB(lastName: string, googleSheetUrl: string, googleFormUrl: string): ReplaySubject<any>{
    let subjRet = new ReplaySubject();
    let self= this;
    subjRet.next(lastName);
    this.doesRoomAlreadyExist(lastName).subscribe(results =>{
      if(results === true){
        let newLastName = lastName + Math.floor(Math.random() * 9);
        this.addItemToDB(newLastName, googleSheetUrl, googleFormUrl);
      } else{
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
        let docClient = new this.AWS.DynamoDB.DocumentClient();
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                subjRet.next(lastName);
                self.dbDisplayName.next(lastName);
            }
        });
      }
    });
    return subjRet;
  }

  doesRoomAlreadyExist(room: string): ReplaySubject<any>{
    let existStatus = new ReplaySubject();
    this.retrieveItemFromDb(room).subscribe(results=>{
      if(results){
        existStatus.next(true);
      } else {
        existStatus.next(false);
      }
    });
    return existStatus;
  }


  retrieveItemFromDb(room: string): ReplaySubject<any>{
    let subjRet = new ReplaySubject();
    this.AWS.config.update({
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: constants.awsAccessKeyId,
      secretAccessKey: constants.awsSecretAccessKey
    });
    let params = {
        TableName:this.table,
        KeyConditionExpression: "room = :rrrr",
        ExpressionAttributeValues: {
            ":rrrr": room
        }
    }
    let docClient = new this.AWS.DynamoDB.DocumentClient();
    docClient.query(params, function(err, data) {
      if (err || data.Items.length === 0) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          subjRet.next(null);
      } else {
          data.Items.forEach(function(item) {
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
