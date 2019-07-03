import { Component, OnInit } from '@angular/core';

import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { ConfigurationService } from '../configuration.service';
import { constants } from '../constants';
// import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private introGoogleSheetUrl: String; //= masterConfigProperties.googleSheetUrl;
  private introGoogleFormUrl: String; // = masterConfigProperties.googleFormUrl;
  private awsKey: string = constants.awsAccessKeyId;
  private awsSecret: string = constants.awsSecretAccessKey;
  private roomRetrieved: boolean = false;
  // private self: any;
  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.configurationVars.pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
      console.log(results[0]);
      console.log(results[1]);
      this.introGoogleSheetUrl = results[0];
      this.introGoogleFormUrl = results[1];
    });
    let self = this;
    this.fetchRoomDeets("Zaddy", self);
  }

  fetchRoomDeets(room: string, self: any){
    var AWS = require("aws-sdk");

    AWS.config.update({
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: this.awsKey,
      secretAccessKey: this.awsSecret
    });
    this.roomRetrieved = true;

    var docClient = new AWS.DynamoDB.DocumentClient();
    let table = "populationSimulatorRooms";
    let params = {
        TableName:table,
        KeyConditionExpression: "room = :rrrr",
        ExpressionAttributeValues: {
            ":rrrr": room
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                // console.log(" -", item.googleSheetUrl + ": " + item.googleFormUrl);
                // self.configService.emitNewConfigVars([item.googleSheetUrl, item.googleFormUrl]);
                self.introGoogleSheetUrl = item.googleSheetUrl;
                self.introGoogleFormUrl = item.googleFormUrl;
            });
        }
    });
  }

}
