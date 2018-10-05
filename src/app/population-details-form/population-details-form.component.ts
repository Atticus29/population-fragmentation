import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { Organism } from '../organism.model';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-population-details-form',
  templateUrl: './population-details-form.component.html',
  styleUrls: ['./population-details-form.component.css'],
})
export class PopulationDetailsFormComponent implements OnInit {
  private userInputFG: FormGroup;
  private submitted: boolean = false;
  private focusOnQuestion: boolean = false;
  private disablePopulationGenerationForm: boolean = false;
  private popsize: number = 1;
  private fragNum: number = 1;
  private genNum: number = 1;
  private greenAlleleFreq: number = 0.8;
  private blueAlleleFreq: number = 0.1;
  private magentaAlleleFreq: number = 0.1;

  private displayQuestions: boolean = false;
  @Output() displayQuestionsEmitter = new EventEmitter<boolean>();
  private displayLizards: boolean = false;
  @Output() displayLizardsEmitter = new EventEmitter<boolean>();
  private openMatingComponent: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();
  private takeNextStep: boolean = false;
  @Output() takeNextStepEmitter = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef) {
    this.userInputFG = this.fb.group({
      popsize: ['10', [Validators.required, Validators.min(1)]], //, Validators.max(1000)
      fragNum: ['1', [Validators.required, Validators.max(1000)]],//, Validators.max(1000)
      genNum:  ['10', [Validators.required, Validators.max(1000)]],//, Validators.max(1000)
      greenAlleleFreq: ['0.33', [Validators.required, Validators.max(1), Validators.min(0)]], //, Validators.max(1), Validators.min(0)
      blueAlleleFreq: ['0.33', [Validators.required, Validators.max(1), Validators.min(0)]],//, Validators.max(1), Validators.min(0)
      magentaAlleleFreq: ['0.34', [Validators.required, Validators.max(1), Validators.min(0)]] //, Validators.max(1), Validators.min(0)
    })
  }

  ngOnInit() {
    let alleleFrequecies = new Array<number>(0.7, 0.1, 0.2);
    let alleleNames = new Array<string>("blue", "green", "magenta");
    // let alleleNameCombos = this.popManager.allGenotypes(new Array<string>("blue", "green", "magenta"),2);
    // let combinations = this.popManager.allGenotypes(new Array<number>(0.9, 0.1, 0),2);
    this.popManager.generateMetaPopulation(alleleFrequecies, alleleNames , 1, 2);
    this.popManager.metapopulationGenerations.pipe(take(1)).subscribe(metapopulations =>{
      metapopulations.forEach(metapopulation =>{
        metapopulation.getSubpopulations().forEach(subpopulation =>{
          alleleNames.forEach(alleleName =>{
            let alleleFreq = this.popManager.calculatePopulationAlleleFrequency(alleleName, subpopulation);
            // console.log(alleleName + " " + alleleFreq.toString());
          });
          // console.log("new subpopulation!");
          let subpopIndivids = subpopulation.getIndividuals();
          subpopIndivids.forEach(organism =>{
            // console.log(organism.getGeneByName("spot color").getGenotype());
          });
        });
      });
    });
  }

  get f() { return this.userInputFG.controls; }

  getValues(){
    let result = this.userInputFG.value;
    return result;
  }

  processForm(){
    //TODO emit to parent to possibly prevent stepper
    //TODO summing to 1 for allele frequencies still an issue
    this.submitted = true;
    if(this.userInputFG.invalid){
      console.log("invalid!");
      return;
    }
    if(this.userInputFG.valid){
      console.log("valid!");
      this.takeNextStep = true;
      this.takeNextStepEmitter.emit(this.takeNextStep);
      // stepper.next();
      // return;
    }
    let result = this.getValues();
    let {popsize, fragNum, genNum, greenAlleleFreq, blueAlleleFreq, magentaAlleleFreq} = result;
    //TODO accommodate fragments
    this.popsize = popsize;
    this.fragNum = fragNum;
    this.genNum = genNum;
    this.greenAlleleFreq = greenAlleleFreq;
    this.blueAlleleFreq = blueAlleleFreq;
    this.magentaAlleleFreq = magentaAlleleFreq;
    console.log(popsize.invalid);
    this.popManager.clearMetaPopulation();
    this.popManager.generateMetaPopulation([+blueAlleleFreq, +greenAlleleFreq, +magentaAlleleFreq],["blue", "green", "magenta"], +popsize, +fragNum);
    this.displayLizards = true;
    this.displayLizardsEmitter.emit(this.displayLizards);
    this.displayQuestions = !this.displayQuestions; //TODO maybe true
    this.displayQuestionsEmitter.emit(this.displayQuestions);
    this.disablePopulationGenerationForm = true;
    this.focusOnQuestion = !this.focusOnQuestion;
  }

  clearPop(){
    this.displayLizards = false;
    this.displayLizardsEmitter.emit(this.displayLizards);
    this.disablePopulationGenerationForm = false;
    this.popManager.clearPopulation();
  }

  //TODO improve this
  // getErrorMessage() {
  //   return popsize.hasError('required') ? 'You must enter a value' :
  //       this.popsize.hasError('small') ? 'Number too small' :
  //           '';
  // }

}
