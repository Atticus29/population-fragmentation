// declare var require: any;

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,Validators,NgForm,} from '@angular/forms';
import {Router} from '@angular/router';

import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

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
  private lastNameDisplay: string = null;
  // private lastNamePlaceholder: string = masterConfigProperties.lastName;
  private googleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private googleFormUrl: string = masterConfigProperties.googleFormUrl;
  private instructorConfigFG: FormGroup;
  private submitted: ReplaySubject<any> = new ReplaySubject();
  private validInputs: boolean = true;
  private displaySuccess: boolean = false;
  private loading: boolean = true;

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
    // this.lastName.next(masterConfigProperties.lastName);
    console.log(this.loading);
    this.submitted.next(false);
    this.dbService.dbDisplayName.subscribe(result =>{
      this.lastNameDisplay = result;
      if(result){
        this.loading = false;
        console.log("loading false now");
      }
    });
    this.submitted.subscribe(result =>{
      console.log("result in component is " + result);
      if(result){
          this.displaySuccess = true;
      } else{
        console.log("submitted result is false/null");
        this.displaySuccess = false;
      }
    });
  }

  processForm(){
    let result = this.getValues();
    let {lastName, spreadsheetUrl, formUrl} = result;
    this.googleSheetUrl = spreadsheetUrl;
    this.googleFormUrl = formUrl;
    if(this.instructorConfigFG.invalid || !this.validationService.validateUrl(this.googleSheetUrl) || !this.validationService.validateUrl(this.googleFormUrl)){
      console.log("invalid!");
      this.validInputs = false;
      return;
    }
    if(this.instructorConfigFG.valid){
      console.log("instructorConfigFG is valid. Awaiting addItemToDB...");
      let dbAdditionSubject = this.dbService.addItemToDB(lastName, this.googleSheetUrl, this.googleFormUrl);
      this.submitted.next(true);
      dbAdditionSubject.subscribe(resp =>{
        console.log("response to dbAdditionSubject subscription in instructor-configure component is "+ resp);
        if(resp){
          this.submitted.next(true);
        } else{
          this.submitted.next(false);
        }
      });
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
