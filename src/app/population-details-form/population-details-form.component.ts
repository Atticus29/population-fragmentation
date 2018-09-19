import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { Organism } from '../organism.model';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';


@Component({
  selector: 'app-population-details-form',
  templateUrl: './population-details-form.component.html',
  styleUrls: ['./population-details-form.component.css'],
})
export class PopulationDetailsFormComponent implements OnInit {
  private userInputFG: FormGroup;
  private displayQuestions: boolean = false;
  private focusOnQuestion: boolean = false;

  @ViewChild('questions-div') questionElement: ElementRef;

  constructor(private fb: FormBuilder, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService) {
    this.userInputFG = this.fb.group({
      popsize: ['100', Validators.required],
      fragNum: ['1', Validators.required],
      genNum:  ['10', Validators.required],
      greenAlleleFreq: ['0.33', Validators.required],
      blueAlleleFreq: ['0.33', Validators.required],
      magentaAlleleFreq: ['0.34', Validators.required]
    })
  }

  ngOnInit() {
  }

  getValues(){
    let result = this.userInputFG.value;
    // console.log(result);
    return result;
  }

  processForm(){
    let result = this.getValues();
    let {popsize, fragNum, genNum, greenAlleleFreq, blueAlleleFreq, magentaAlleleFreq} = result;
    this.displayQuestions = !this.displayQuestions;
    // console.log(this.focusOnQuestion);

    //TODO remove this because it is simply a test of the population manager
    this.focusOnQuestion = !this.focusOnQuestion;
    let testIndividual: Organism = this.individualGenService.makeIndividual("green", "blue");
    this.popManager.addOrganismToPopulation(testIndividual);

    // console.log(this.focusOnQuestion);
    // this.questionElement.nativeElement.focus();
    // focus('questions-div');
  }

  //TODO improve this
  // getErrorMessage() {
  //   return this.popsize.hasError('required') ? 'You must enter a value' :
  //       this.popsize.hasError('small') ? 'Number too small' :
  //           '';
  // }

}
