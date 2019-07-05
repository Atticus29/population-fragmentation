declare var require: any;

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,Validators,NgForm,} from '@angular/forms';
import {Router} from '@angular/router';

import { Observable, BehaviorSubject } from "rxjs";

import { masterConfigProperties } from '../masterConfiguration';
import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-instructor-configure',
  templateUrl: './instructor-configure.component.html',
  styleUrls: ['./instructor-configure.component.scss']
})
export class InstructorConfigureComponent implements OnInit {
  private lastName: string = masterConfigProperties.lastName;
  private googleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private googleFormUrl: string = masterConfigProperties.googleFormUrl;
  // private awsKey: string = constants.awsAccessKeyId;
  // private awsSecret: string = constants.awsSecretAccessKey;
  private instructorConfigFG: FormGroup;
  private submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private self: any;
  // private submitted: any =  Observable.create(obs => {
  //     obs.next(false);
  // });
  private validInputs: boolean = true;
  private displaySuccess: boolean = false;

  errorFormStringMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (!this.instructorConfigFG.value.lastName || !this.validationService.hasTwoOrMoreCharacters(this.instructorConfigFG.value.lastName));
    }
  }

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

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService, private router: Router, private dbService: DatabaseService) {
    this.instructorConfigFG = this.fb.group({
      lastName: [this.lastName, Validators.required],
      spreadsheetUrl: [this.googleSheetUrl,Validators.required],
      formUrl: [this.googleFormUrl,Validators.required]
    });
  }

  ngOnInit() {
    // this.self = this;
    this.submitted.subscribe(result =>{
      console.log("result is " + result);
      this.displaySuccess = result;
    });
  }

  processForm(){
    let result = this.getValues();
    let {lastName, spreadsheetUrl, formUrl} = result;
    this.googleSheetUrl = spreadsheetUrl;
    this.googleFormUrl = formUrl;
    this.lastName = lastName;
    if(this.instructorConfigFG.invalid || !this.validationService.validateUrl(this.googleSheetUrl) || !this.validationService.validateUrl(this.googleFormUrl)){
      console.log("invalid!");
      this.validInputs = false;
      return;
    }
    if(this.instructorConfigFG.valid){
      this.dbService.addItemToDB(this.lastName, this.googleSheetUrl, this.googleFormUrl).subscribe(resp =>{
        console.log(resp);
        this.submitted.next(resp);
      })
      // console.log("response in component is " + response);

    //   let AWS = require("aws-sdk");
    //
    //   AWS.config.update({
    //     region: "us-east-1",
    //     endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    //     accessKeyId: this.awsKey,
    //     secretAccessKey: this.awsSecret
    //     });
    //   let docClient = new AWS.DynamoDB.DocumentClient();
    //
    //   let table = "populationSimulatorRooms";
    //
    //   let room = lastName; //TODO make this something the user inputs
    //
    //   let params = {
    //       TableName:table,
    //       Item:{
    //           "room": room,
    //           "lastName": lastName,
    //           "googleSheetUrl": this.googleSheetUrl,
    //           "googleFormUrl": this.googleFormUrl
    //       }
    //   };
    //   console.log("Adding a new item...");
    //   docClient.put(params, function(err, data) {
    //       if (err) {
    //           console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    //       } else {
    //           self.submitted.next(true);
    //           console.log("Added item:", JSON.stringify(data, null, 2));
    //           console.log("got here hi");
    //           this.displaySuccess = true;
    //       }
    //   });
    //
    //   // this.configService.emitNewConfigVars([this.googleSheetUrl, this.googleFormUrl]);
    //   // this.router.navigate(['/']);
    }

  }

  getValues(){
    let result = this.instructorConfigFG.value;
    return result;
  }

  backToHome(){
    this.router.navigate(['/']);
  }

}
