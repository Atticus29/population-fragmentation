// declare var require: any;

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
  private instructorConfigFG: FormGroup;
  private submitted: BehaviorSubject<any> = new BehaviorSubject(null);
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
    this.submitted.subscribe(result =>{
      if(result){
          this.displaySuccess = true;
      } else{
        this.displaySuccess = false;
      }
      // console.log("result is " + result);
      // this.displaySuccess = result;
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
      console.log(this.dbService);
      this.dbService.addItemToDB(this.lastName, this.googleSheetUrl, this.googleFormUrl).subscribe(resp =>{
        // console.log(resp);
        if(resp){
          this.lastName = resp.lastName;
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
