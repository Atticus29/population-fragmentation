import { Component, OnInit, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import {FormBuilder, FormControl, FormGroup,FormGroupDirective,FormArray,Validators,NgForm,ValidationErrors} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {ErrorStateMatcher} from '@angular/material';

import { take } from 'rxjs/operators';

import { Organism } from '../organism.model';
import { MetapopulationOfMatedPairs } from '../metapopulationOfMatedPairs.model';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { QuestionService } from '../question.service';
import { Problem } from '../problem.model';


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
  private MAX_GEN: number = 100;

  errorMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      let theSum: number = +this.userInputFG.value.greenAlleleFreq + +this.userInputFG.value.blueAlleleFreq + +this.userInputFG.value.magentaAlleleFreq;
      let roundedNum = this.qs.roundToNearest(theSum, 5);
      return(roundedNum != 1);
    }
  }

  errorPopSizeMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (+this.userInputFG.value.popsize < +this.userInputFG.value.fragNum || +this.userInputFG.value.fragNum < 1);
    }
  }

  errorGenNumMatcher = {
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      return (+this.userInputFG.value.genNum < 1 || +this.userInputFG.value.genNum > this.MAX_GEN);
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

  constructor(private fb: FormBuilder, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef, private defaultErrorStateMatcher: ErrorStateMatcher, private qs: QuestionService) {
    this.userInputFG = this.fb.group({
      popsize: ['10', [Validators.required, Validators.min(1)]], //, Validators.max(1000)
      fragNum: ['1', [Validators.required, Validators.min(1), Validators.max(1000)]],//, Validators.max(1000)
      genNum:  ['10', [Validators.required, Validators.min(1), Validators.max(1000)]],//, Validators.max(1000)
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
    let roundedNum = this.qs.roundToNearest(theSum, 5);
    if(roundedNum == 1){
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
    this.submitted = true;
    if(this.userInputFG.invalid){
      // console.log("currently, input is invalid");
      return;
    }
    if(this.userInputFG.valid){
      // console.log("currently, input is valid");
      this.takeNextStep = true;
      this.takeNextStepEmitter.emit(this.takeNextStep);
      let result = this.getValues();
      let {popsize, fragNum, genNum, greenAlleleFreq, blueAlleleFreq, magentaAlleleFreq} = result;
      this.popsize = popsize;
      this.fragNum = fragNum;
      this.genNum = genNum;
      this.popManager.totalGenNumSource.next(genNum);
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
          //TODO add a problem to the problem service after creation of metapopulation
          let blueSubPop1Freq = this.popManager.calculatePopulationAlleleFrequency("blue", metapopulation.getSubpopulation(0));
          let blueSubPop1FreqProblem = new Problem("What is the allele frequency of the blue allele in subpopulation 1?", [this.qs.roundToNearest((blueSubPop1Freq + 0.25),3).toString(), this.qs.roundToNearest(blueSubPop1Freq,3).toString(), "0", "1"], this.qs.roundToNearest(blueSubPop1Freq,3).toString());
          this.qs.addProblemToList(blueSubPop1FreqProblem);
          let greenSubPop1Freq = this.popManager.calculatePopulationAlleleFrequency("green", metapopulation.getSubpopulation(0));
          let greenSubPop1FreqProblem = new Problem("What is the allele frequency of the green allele in subpopulation 1?", ["0", this.qs.roundToNearest((greenSubPop1Freq + 0.25),3).toString(), this.qs.roundToNearest(greenSubPop1Freq,3).toString(), "1"], this.qs.roundToNearest(greenSubPop1Freq,3).toString());
          this.qs.addProblemToList(greenSubPop1FreqProblem);
          let magentaSubPop1Freq = this.popManager.calculatePopulationAlleleFrequency("magenta", metapopulation.getSubpopulation(0));
          let magentaSubPop1FreqProblem = new Problem("What is the allele frequency of the magenta allele in subpopulation 1?", ["1", this.qs.roundToNearest((magentaSubPop1Freq - 0.25),3).toString(), this.qs.roundToNearest(magentaSubPop1Freq,3).toString(), "0"], this.qs.roundToNearest(magentaSubPop1Freq,3).toString());
          this.qs.addProblemToList(magentaSubPop1FreqProblem);

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
    // this.displayLizards = false;
    // this.displayLizardsEmitter.emit(this.displayLizards);
    // this.disablePopulationGenerationForm = false;
    // this.popManager.clearMetaPopulation();
    // this.popManager.clearMetaPopulationOfMatedPairs();
    // //TODO you should get rid of dynamically generated questions
    // this.qs.clearQuestions(); //TODO is this overkill and will it create errors?
    //TODO the reload is a good quick fix for the "confirm that the generations work with large fragment numbers --> works fine unless you hit clear pop (this should really just be a refresh)" bug that used to be in the spec list, but not necessarily the best fix
    window.location.reload(true);
  }
}
