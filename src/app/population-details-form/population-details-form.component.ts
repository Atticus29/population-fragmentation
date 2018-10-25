import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup,FormGroupDirective,FormArray,Validators,NgForm,ValidationErrors} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { Organism } from '../organism.model';
import { MetapopulationOfMatedPairs } from '../metapopulationOfMatedPairs.model';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material';


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

  errorMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      let theSum: number = +this.userInputFG.value.greenAlleleFreq + +this.userInputFG.value.blueAlleleFreq + +this.userInputFG.value.magentaAlleleFreq;
      let roundedNum = this.roundToNearest(theSum, 5);
      return(roundedNum != 1);
    }
  }

  errorPopSizeMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (+this.userInputFG.value.popsize < +this.userInputFG.value.fragNum || +this.userInputFG.value.fragNum < 1);
    }
  }

  private displayQuestions: boolean = false;
  @Output() displayQuestionsEmitter = new EventEmitter<boolean>();
  private displayLizards: boolean = false;
  @Output() displayLizardsEmitter = new EventEmitter<boolean>();
  private openMatingComponent: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();
  private takeNextStep: boolean = false;
  @Output() takeNextStepEmitter = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef, private defaultErrorStateMatcher: ErrorStateMatcher) {
    this.userInputFG = this.fb.group({
      popsize: ['10', [Validators.required, Validators.min(1)]], //, Validators.max(1000)
      fragNum: ['1', [Validators.required, Validators.max(1000)]],//, Validators.max(1000)
      genNum:  ['10', [Validators.required, Validators.max(1000)]],//, Validators.max(1000)
      greenAlleleFreq: ['0.33', [Validators.required, Validators.max(1), Validators.min(0)]], //, Validators.max(1), Validators.min(0)
      blueAlleleFreq: ['0.33', [Validators.required, Validators.max(1), Validators.min(0)]],//, Validators.max(1), Validators.min(0)
      magentaAlleleFreq: ['0.34', [Validators.required, Validators.max(1), Validators.min(0)]] //, Validators.max(1), Validators.min(0)
    },{validator: [this.sumToOne.bind(this), this.popSizeBigEnoughForFrag]})
  }

  ngOnInit() {
    let alleleFrequecies = new Array<number>(0.7, 0.1, 0.2);
    let alleleNames = new Array<string>("blue", "green", "magenta");
    this.popManager.generateMetaPopulation(alleleFrequecies, alleleNames , 20, 2);
    this.popManager.metapopulationGenerations.pipe(take(1)).subscribe(metapopulations =>{
      metapopulations.forEach(metapopulation =>{
        metapopulation.getSubpopulations().forEach(subpopulation =>{
          // console.log(subpopulation.getIndividuals());
          alleleNames.forEach(alleleName =>{
            // console.log(alleleName);
            let alleleFreq = this.popManager.calculatePopulationAlleleFrequency(alleleName, subpopulation);
            // console.log(alleleFreq);
            // console.log(alleleName + " " + alleleFreq.toString());
          });
          // console.log("new subpopulation!");
          let subpopIndivids = subpopulation.getIndividuals();
          let scrambled = this.popManager.shuffle(subpopIndivids);
          // console.log(subpopIndivids);
          // console.log(scrambled);
          subpopIndivids.forEach(organism =>{
            // console.log(organism.getGeneByName("spot color").getGenotype());
          });
        });
      });
    });
  }

  get f() { return this.userInputFG.controls; }

  sumToOne(fg: FormGroup){
    let theSum: number = +fg.value.greenAlleleFreq + +fg.value.blueAlleleFreq + +fg.value.magentaAlleleFreq;
    let roundedNum = this.roundToNearest(theSum, 5);
    if(roundedNum == 1){
      console.log(roundedNum);
      //TODO figure out why the error won't go away
      return null;
    } else{
      return {alleleFrequencySumError: true};
    }
  }

  popSizeBigEnoughForFrag(fg: FormGroup){
    if(+fg.value.popsize >= +fg.value.fragNum){
      return null;
    } else{
      return {popSizeVsFragNumMismatchError: true};
    }
  }

  getValues(){
    let result = this.userInputFG.value;
    return result;
  }

  processForm(){
    //TODO summing to 1 for allele frequencies still an issue
    this.submitted = true;
    if(this.userInputFG.invalid){
      console.log("currently, input is invalid");
      return;
    }
    if(this.userInputFG.valid){
      console.log("currently, input is valid");
      this.takeNextStep = true;
      this.takeNextStepEmitter.emit(this.takeNextStep);
      let result = this.getValues();
      let {popsize, fragNum, genNum, greenAlleleFreq, blueAlleleFreq, magentaAlleleFreq} = result;
      this.popsize = popsize;
      this.fragNum = fragNum;
      this.genNum = genNum;
      this.greenAlleleFreq = greenAlleleFreq;
      this.blueAlleleFreq = blueAlleleFreq;
      this.magentaAlleleFreq = magentaAlleleFreq;
      this.popManager.clearMetaPopulation();
      this.popManager.generateMetaPopulation([+blueAlleleFreq, +greenAlleleFreq, +magentaAlleleFreq],["blue", "green", "magenta"], +popsize, +fragNum);
      //TODO figure out whether this should happen
      // this.popManager.currentMetapopulationOfMatedPairs.pipe(take(1)).subscribe((metapopulationOfMatedPairs: MetapopulationOfMatedPairs) =>{
      // });
      this.popManager.currentMetaPopulation.pipe(take(1)).subscribe(metapopulation =>{
          this.popManager.addToMetapopulationGenerations(metapopulation);
      });
      this.displayLizards = true;
      this.displayLizardsEmitter.emit(this.displayLizards);
      this.displayQuestions = !this.displayQuestions; //TODO maybe true
      this.displayQuestionsEmitter.emit(this.displayQuestions);
      this.disablePopulationGenerationForm = true;
      this.focusOnQuestion = !this.focusOnQuestion;
    }
  }

  clearPop(){
    this.displayLizards = false;
    this.displayLizardsEmitter.emit(this.displayLizards);
    this.disablePopulationGenerationForm = false;
    this.popManager.clearMetaPopulation();
    this.popManager.clearMetaPopulationOfMatedPairs();
  }

  roundToNearest(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  }
}
