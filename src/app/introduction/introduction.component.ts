import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators, NgForm } from '@angular/forms';

import { of, combineLatest, Subject, BehaviorSubject } from 'rxjs';

import { ConfigurationService } from '../configuration.service';
import { ValidationService } from '../validation.service';
import { DatabaseService } from '../database.service';

import { masterConfigProperties } from '../masterConfiguration';
import { constants } from '../constants';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  private introGoogleSheetUrl: String;
  private introGoogleFormUrl: String;
  private lastName: string = masterConfigProperties.lastName;
  private roomRetrieved: boolean = false;
  private roomEntryFG: FormGroup;
  private submitted: boolean = false;
  private validInputs: boolean = true;
  private heading: string = "Introduction";
  private text: string = "In this simulation, you will be learning about how population fragmentation increases the rate at which genetic diversity is lost. We’ll be simulating populations of snarl-toothed draggles. Scientists have recently discovered that a single gene fully controls spot color, which is the gene you’ll be tracking through the generations."
  private text2: string = "We'll be tracking genetic diversity at this spot color gene using a metric called, 'expected heterozygosity'."
  private text3: string = "The class will be dividing into teams of two or three. Some teams will simulate populations split into various equally-sized fragments (a.k.a., subpopulation), while others will simulate one intact population.";
  private text4: string = "Each population fragment can’t reach (and therefore can’t mate with) any other.";
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private displayRoomForm: boolean = true;
  private displayIntroText: boolean = false;
  private displayError: boolean = false;

  errorFormStringMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (!this.roomEntryFG.value.lastName || !this.validationService.hasTwoOrMoreCharacters(this.roomEntryFG.value.lastName));
    }
  }

  get f() { return this.roomEntryFG.controls; }

  constructor(private fb: FormBuilder, private configService: ConfigurationService, private validationService: ValidationService, private dbService: DatabaseService) {
    this.roomEntryFG = this.fb.group({
      lastName: [this.lastName, Validators.required],
    });
  }

  ngOnInit() {
    let self = this;
  }

  getValues(){
    let result = this.roomEntryFG.value;
    return result;
  }

  processForm(){
    this.submitted = true;
    let result = this.getValues();
    let {lastName} = result;
    this.lastName = lastName;
    if(this.roomEntryFG.invalid){
      // console.log("invalid!");
      this.validInputs = false;
      return;
    }
    if(this.roomEntryFG.valid){
      this.dbService.retrieveItemFromDb(lastName).subscribe(result=>{
        console.log("result is " + result);
        if(result){
          this.displayRoomForm = false;
          this.roomRetrieved = true;
          this.displayError = false;
          this.dbService.emitRoomName(lastName);
        } else{
          this.displayError = true;
        }
        // this.introGoogleSheetUrl = result.sheetUrl;
        // this.introGoogleFormUrl = result.formUrl;
      });
    }
  }

}
