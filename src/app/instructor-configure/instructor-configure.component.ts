import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,FormArray,Validators,NgForm,ValidationErrors} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ErrorStateMatcher} from '@angular/material';

import { masterConfigProperties } from '../masterConfiguration';
import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-instructor-configure',
  templateUrl: './instructor-configure.component.html',
  styleUrls: ['./instructor-configure.component.scss']
})
export class InstructorConfigureComponent implements OnInit {
  private googleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private googleFormUrl: string = masterConfigProperties.googleSheetUrl;
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

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService) {
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
      this.configService.emitNewConfigVars([this.googleSheetUrl, this.googleFormUrl]);
    }

  }

  getValues(){
    let result = this.instructorConfigFG.value;
    return result;
  }

}
