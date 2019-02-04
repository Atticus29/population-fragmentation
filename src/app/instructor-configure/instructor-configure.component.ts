import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,FormArray,Validators,NgForm,ValidationErrors} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ErrorStateMatcher} from '@angular/material';

import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-instructor-configure',
  templateUrl: './instructor-configure.component.html',
  styleUrls: ['./instructor-configure.component.scss']
})
export class InstructorConfigureComponent implements OnInit {
  private googleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private googleFormUrl: string = masterConfigProperties.googleFormUrl;
  private instructorConfigFG: FormGroup;
  private submitted: boolean = false;

  errorSpreadsheetUrlMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (this.instructorConfigFG.value.spreadsheetUrl);//TODO .isValidUrl
    }
  }

  errorFormUrlMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (this.instructorConfigFG.value.formUrl);//TODO .isValidUrl
    }
  }

  constructor(private fb: FormBuilder) {
    this.instructorConfigFG = this.fb.group({
      spreadsheetUrl: [Validators.required],
      formUrl: [Validators.required]
    })
  }

  ngOnInit() {
  }

  processForm(){
    console.log("process!");
  }

}
