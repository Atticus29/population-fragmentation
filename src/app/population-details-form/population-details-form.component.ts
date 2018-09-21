import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { Organism } from '../organism.model';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-population-details-form',
  templateUrl: './population-details-form.component.html',
  styleUrls: ['./population-details-form.component.css'],
})
export class PopulationDetailsFormComponent implements OnInit {
  private userInputFG: FormGroup;
  private displayQuestions: boolean = false;
  private displayLizards: boolean = false;
  private focusOnQuestion: boolean = false;
  private disablePopulationGenerationForm: boolean = false;

  @ViewChild('questions-div') questionElement: ElementRef;

  constructor(private fb: FormBuilder, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef) {
    this.userInputFG = this.fb.group({
      popsize: ['10', Validators.required], //, Validators.max(1000)
      fragNum: ['1', Validators.required],//, Validators.max(1000)
      genNum:  ['10', Validators.required],//, Validators.max(1000)
      greenAlleleFreq: ['0.33', Validators.required], //, Validators.max(1), Validators.min(0)
      blueAlleleFreq: ['0.33', Validators.required],//, Validators.max(1), Validators.min(0)
      magentaAlleleFreq: ['0.34', Validators.required] //, Validators.max(1), Validators.min(0)
    })
  }

  ngOnInit() {
  }

  getValues(){
    let result = this.userInputFG.value;
    return result;
  }

  processForm(){
    let result = this.getValues();
    let {popsize, fragNum, genNum, greenAlleleFreq, blueAlleleFreq, magentaAlleleFreq} = result;
    console.log(blueAlleleFreq);
    console.log(greenAlleleFreq);
    console.log(magentaAlleleFreq);
    //TODO accommodate fragments
    this.popManager.clearPopulation();
    this.popManager.generatePopulation(+blueAlleleFreq, +greenAlleleFreq, +magentaAlleleFreq, +popsize);
    this.displayLizards = true;
    this.displayQuestions = !this.displayQuestions; //TODO maybe true
    this.disablePopulationGenerationForm = true;
    this.focusOnQuestion = !this.focusOnQuestion;
  }

  clearPop(){
    this.displayLizards = false;
    this.disablePopulationGenerationForm = false;
    this.popManager.clearPopulation();
  }

  //TODO improve this
  // getErrorMessage() {
  //   return this.popsize.hasError('required') ? 'You must enter a value' :
  //       this.popsize.hasError('small') ? 'Number too small' :
  //           '';
  // }

}
