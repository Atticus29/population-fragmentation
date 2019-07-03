import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,Validators,NgForm,} from '@angular/forms';
import {Router} from '@angular/router';

import { masterConfigProperties } from '../masterConfiguration';
import { constants } from '../constants';
import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-instructor-configure',
  templateUrl: './instructor-configure.component.html',
  styleUrls: ['./instructor-configure.component.scss']
})
export class InstructorConfigureComponent implements OnInit {
  private googleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private googleFormUrl: string = masterConfigProperties.googleFormUrl;
  private awsKey: string = constants.awsAccessKeyId;
  private awsSecret: string = constants.awsSecretAccessKey;
  private instructorConfigFG: FormGroup;
  private submitted: boolean = false;
  private validInputs: boolean = true;

  errorSpreadsheetUrlMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (!this.instructorConfigFG.value.spreadsheetUrl || !this.validationService.validateUrl(this.instructorConfigFG.value.spreadsheetUrl));
    }
  }

  errorFormUrlMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (!this.instructorConfigFG.value.formUrl || !this.validationService.validateUrl(this.instructorConfigFG.value.formUrl));
    }
  }

  get f() { return this.instructorConfigFG.controls; }

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService, private router: Router) {
    this.instructorConfigFG = this.fb.group({
      spreadsheetUrl: [this.googleSheetUrl,Validators.required],
      formUrl: [this.googleFormUrl,Validators.required]
    })
  }

  ngOnInit() {
  }

  processForm(){
    this.submitted = true;
    let result = this.getValues();
    let {spreadsheetUrl, formUrl} = result;
    this.googleSheetUrl = spreadsheetUrl;
    this.googleFormUrl = formUrl;
    if(this.instructorConfigFG.invalid || !this.validationService.validateUrl(this.googleSheetUrl) || !this.validationService.validateUrl(this.googleFormUrl)){
      console.log("invalid!");
      this.validInputs = false;
      return;
    }
    if(this.instructorConfigFG.valid){
      console.log(this.googleSheetUrl);
      console.log(this.googleFormUrl);
      let AWS = require("aws-sdk");

      AWS.config.update({
        region: "us-east-1",
        endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
        // accessKeyId default can be used while using the downloadable version of DynamoDB.
        // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
        accessKeyId: this.awsKey,
        // secretAccessKey default can be used while using the downloadable version of DynamoDB.
        // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
        secretAccessKey: this.awsSecret
        });
      let docClient = new AWS.DynamoDB.DocumentClient();

      let table = "populationSimulatorRooms";

      let room = "testRoom"; //TODO make this something the user inputs

      let params = {
          TableName:table,
          Item:{
              "room": room,
              "lastName": "Mom",
              "googleSheetUrl": this.googleSheetUrl,
              "googleFormUrl": this.googleFormUrl
          }
      };

      console.log("Adding a new item...");
      docClient.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("Added item:", JSON.stringify(data, null, 2));
          }
      });

      this.configService.emitNewConfigVars([this.googleSheetUrl, this.googleFormUrl]);
      this.router.navigate(['/']);
    }

  }

  getValues(){
    let result = this.instructorConfigFG.value;
    return result;
  }

}
