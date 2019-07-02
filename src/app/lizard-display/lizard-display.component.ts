import { ChangeDetectorRef, OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { take, takeUntil } from 'rxjs/operators';
import { Observable, Subject, combineLatest } from "rxjs";

import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
import { Population } from '../population.model';
import { MatedPair } from '../mated-pair.model';

import { DrawingService } from '../drawing.service';
import { ColorNameService } from '../color-name.service';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { QuestionService } from '../question.service';
import { MatedSnackbarComponent } from '../mated-snackbar/mated-snackbar.component';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService, MatSnackBar]
})
export class LizardDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvases') canvases: QueryList<ElementRef>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private subpopulations: Array<Population>;
  private matingsCompleted: any;
  // private matingsCompleted: Observable<boolean> = Observable.create(obs => {
  //   obs.next(false);
  // });
  false; //TODO allow to be toggled on
  private shuffleAndPairButton: boolean = false; //TODO allow to be toggled on
  private goToQuestions: boolean = true;
  private allGenerationsViewed: boolean = false;
  private genNum: number = null;
  // private individuals: Array<Organism>;
  private genotypeTest: Genotype;

  private isMatingComponentOpen: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();
  @Output() takeToEndEmitter = new EventEmitter<boolean>();

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef, private qs: QuestionService, public snackBar: MatSnackBar) { }

  ngOnInit() {
      this.popManager.currentMetaPopulation.subscribe(metapopulation =>{ //.pipe(take(1))
        this.subpopulations = metapopulation.getSubpopulations();
        this.cdr.detectChanges(); //TODO figure out order
        this.drawDraggles();
        this.cdr.detectChanges();
      });

      //this has to happen before the check for whether this is the last generation
      combineLatest([this.popManager.isEveryoneInTheMetaPopulationMated(), this.popManager.isThisTheLastGeneration(), this.popManager.nextClickedAfterQuestionsAnsweredSource]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
        let everyoneMatedStatus = results[0];
        let nextClicked = results[2];
        let isLastGen = results[1];
        this.matingsCompleted = everyoneMatedStatus;
        this.shuffleAndPairButton = !everyoneMatedStatus && nextClicked;
        if(isLastGen){
          console.log("it's the last gen!");
          this.shuffleAndPairButton = false;
        }
      });

      // this.popManager.isEveryoneInTheMetaPopulationMated().subscribe(status =>{
      //   this.matingsCompleted = status;
      //   this.shuffleAndPairButton = !status; //TODO this won't make it false until it's false everywhere?
      // });

      // this.qs.questionsAnswered.subscribe(questionsAnswered =>{
      //   this.shuffleAndPairButton = questionsAnswered;
      //   if(questionsAnswered){
      //     this.goToQuestions = false;
      //   } else {
      //     this.goToQuestions = true;
      //   }
      // });

      combineLatest([this.popManager.isThisTheLastGeneration(), this.qs.questionsAnswered, this.popManager.nextClickedAfterQuestionsAnsweredSource]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
        let isThisTheLastGeneration = results[0];
        let questionsAnswered = results[1];
        let nextClicked = results[2];
        this.shuffleAndPairButton = questionsAnswered && nextClicked;
        if(questionsAnswered && nextClicked){
          this.goToQuestions = false;
        } else {
          this.goToQuestions = true;
        }
        if(isThisTheLastGeneration && questionsAnswered && nextClicked){
            console.log("isThisTheLastGeneration and questionsAnswered and nextClicked are true from lizard-display");
            this.allGenerationsViewed = true;
            this.goToQuestions = false;
            this.shuffleAndPairButton = false;
        }
      });

      this.popManager.currentGenNum.pipe(takeUntil(this.ngUnsubscribe)).subscribe((genNum:number) =>{
        this.genNum = genNum;
      });

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    this.drawDraggles();
  }

  drawDraggles(){
    let canvasArray = this.canvases.toArray();
    for(let i = 0; i<this.subpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.subpopulations[i];
      for(let j = 0; j<currentSubpopulation.getIndividuals().length; j++){
        let currentIndividual = currentSubpopulation.getIndividuals()[j];
        let canvasNum: number = (i)*currentSubpopulation.getIndividuals().length + j;
        // console.log(canvasArray);
        // console.log(canvasNum);
        let width: number = document.getElementById('draggle-canvas').offsetWidth;
        let height: number = document.getElementById('draggle-canvas').offsetHeight;
        this.ds.drawLizard(canvasArray[canvasNum], currentIndividual.getGeneByName("spot color").getGenotype(), width, height); //TODO dynamic width height
      }
    }
  }

  pickTwoToMate(subpopNum: number){
    this.popManager.pickTwoToMate(subpopNum);
    this.popManager.getMostRecentMatedPair(subpopNum).pipe(take(1)).subscribe(mostRecentMatedPair =>{
        this.openSnackBar(mostRecentMatedPair.getIndividual1().getOrganismName(), mostRecentMatedPair.getIndividual2().getOrganismName());
    });
    this.popManager.currentMetaPopulation.subscribe(metapopulation =>{ //TODO pipe take(1)?
      // console.log(metapopulation);
      //TODO currently broken
      this.subpopulations = metapopulation.getSubpopulations();
      this.cdr.detectChanges(); //TODO figure out order
      this.drawDraggles();
      this.cdr.detectChanges();
    });

  }

  openSnackBar(name1: string, name2: string) {
    this.snackBar.open(name1 + " and " + name2 + " have been selected", '',{duration: 2000,});
    // this.snackBar.openFromComponent(MatedSnackbarComponent, { //TODO figure out why not working
    //   duration: 3000,
    // });
  }

  openMatingComponent(){
    this.isMatingComponentOpen = true;
    this.openMatingComponentEmitter.emit(this.isMatingComponentOpen);
  }

  takeThemToTheEnd(){
    this.takeToEndEmitter.emit(true);
  }
}
