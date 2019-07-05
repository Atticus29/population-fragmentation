declare var require: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators, NgForm } from '@angular/forms';

import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { masterConfigProperties } from '../masterConfiguration';
import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';
import { constants } from '../constants';
// import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private lastName: string = masterConfigProperties.lastName;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private introGoogleSheetUrl: String; //= masterConfigProperties.googleSheetUrl;
  private introGoogleFormUrl: String; // = masterConfigProperties.googleFormUrl;
  private awsKey: string = constants.awsAccessKeyId;
  private awsSecret: string = constants.awsSecretAccessKey;
  private roomRetrieved: boolean = false;
  private roomEntryFG: FormGroup;
  private submitted: boolean = false;
  private validInputs: boolean = true;
  private AWS = require("aws-sdk");


  errorFormStringMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (!this.roomEntryFG.value.lastName || !this.validationService.hasTwoOrMoreCharacters(this.roomEntryFG.value.lastName));
    }
  }

  get f() { return this.roomEntryFG.controls; }

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService) {
    this.roomEntryFG = this.fb.group({
      lastName: [this.lastName, Validators.required],
    });
  }

  ngOnInit() {
    // this.configService.configurationVars.pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
    //   console.log(results[0]);
    //   console.log(results[1]);
    //   this.introGoogleSheetUrl = results[0];
    //   this.introGoogleFormUrl = results[1];
    // });
    let self = this;
  }

  getValues(){
    let result = this.roomEntryFG.value;
    return result;
  }

  fetchRoomDeets(room: string, self: any){
    self.AWS.config.update({
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: this.awsKey,
      secretAccessKey: this.awsSecret
    });
    this.roomRetrieved = true;

    var docClient = new self.AWS.DynamoDB.DocumentClient();
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
                // self.configService.emitNewConfigVars([item.googleSheetUrl, item.googleFormUrl]);
                self.introGoogleSheetUrl = item.googleSheetUrl;
                self.introGoogleFormUrl = item.googleFormUrl;
            });
        }
    });
  }

  processForm(){
    this.submitted = true;
    let result = this.getValues();
    console.log(result);
    let {lastName} = result;
    this.lastName = lastName;
    if(this.roomEntryFG.invalid){
      console.log("invalid!");
      this.validInputs = false;
      return;
    }
    if(this.roomEntryFG.valid){
      this.fetchRoomDeets("Zaddy", self);
    }
  }

}
