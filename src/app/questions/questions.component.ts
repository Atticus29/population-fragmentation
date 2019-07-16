import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators, NgForm } from '@angular/forms';

import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';
import { DatabaseService } from '../database.service';

import { masterConfigProperties } from '../masterConfiguration';
import { constants } from '../constants';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private lastName: string = masterConfigProperties.lastName;
  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  private introGoogleSheetUrl: String;
  private introGoogleFormUrl: String;
  // private awsKey: string = constants.awsAccessKeyId;
  // private awsSecret: string = constants.awsSecretAccessKey;
  private roomRetrieved: boolean = false;
  // private roomEntryFG: FormGroup;
  // private submitted: boolean = false;
  // private validInputs: boolean = true;

  // errorFormStringMatcher = {
  //   isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
  //     return (!this.roomEntryFG.value.lastName || !this.validationService.hasTwoOrMoreCharacters(this.roomEntryFG.value.lastName));
  //   }
  // }

  // get f() { return this.roomEntryFG.controls; }

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService, private dbService: DatabaseService) {
    // this.roomEntryFG = this.fb.group({
    //   lastName: [this.lastName, Validators.required],
    // });
  }

  ngOnInit() {
    let self = this;
    this.dbService.studentEnteredRoomName.subscribe(studentEnteredResult =>{
      if(studentEnteredResult){
        this.dbService.retrieveItemFromDb(studentEnteredResult).subscribe(result=>{
          this.introGoogleSheetUrl = result.sheetUrl;
          this.introGoogleFormUrl = result.formUrl;
          this.roomRetrieved = true;
        });
      } else{
        this.dbService.retrieveItemFromDb(this.lastName).subscribe(result=>{
          this.introGoogleSheetUrl = result.sheetUrl;
          this.introGoogleFormUrl = result.formUrl;
          this.roomRetrieved = true;
        });
      }
    });
  }

  // getValues(){
  //   let result = this.roomEntryFG.value;
  //   return result;
  // }
  //
  // processForm(){
  //   this.submitted = true;
  //   let result = this.getValues();
  //   // console.log(result);
  //   let {lastName} = result;
  //   this.lastName = lastName;
  //   if(this.roomEntryFG.invalid){
  //     // console.log("invalid!");
  //     this.validInputs = false;
  //     return;
  //   }
  //   if(this.roomEntryFG.valid){
  //     this.dbService.retrieveItemFromDb(lastName).subscribe(result=>{
  //       this.introGoogleSheetUrl = result.sheetUrl;
  //       this.introGoogleFormUrl = result.formUrl;
  //       this.roomRetrieved = true;
  //     });
  //   }
  // }

}
