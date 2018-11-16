import { ChangeDetectorRef, OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatStepper } from '@angular/material';

import { take, takeUntil } from 'rxjs/operators';
import { Observable, forkJoin, Subject } from "rxjs";

import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';
import { Organism } from '../organism.model';
import { Metapopulation } from '../metapopulation.model';
import { PopulationOfMatedPairs } from '../populationOfMatedPairs.model';

import { PopulationManagerService } from '../population-manager.service';
import { DrawingService } from '../drawing.service';
import { IndividualGenerationService } from '../individual-generation.service';

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('matingcanvases') canvases: QueryList<ElementRef>;
  @Output() repeatMatingEmitter = new EventEmitter<boolean>();
  @Output() doneRepeatingEmitter = new EventEmitter<boolean>();
  private matedPairSubpopulations: Array<PopulationOfMatedPairs> = new Array<PopulationOfMatedPairs>();
  private hideNextButton: boolean = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private popManager: PopulationManagerService, private ds: DrawingService, private cdr: ChangeDetectorRef, private individualGenerationService: IndividualGenerationService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.popManager.currentMetapopulationOfMatedPairs.pipe(takeUntil(this.ngUnsubscribe)).subscribe(metapopulationOfMatedPairs =>{
      this.matedPairSubpopulations = metapopulationOfMatedPairs.getSubpopulations();
      if(this.matedPairSubpopulations.length > 0){
        this.cdr.detectChanges();
        this.drawDraggles();
      }
    });
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
    // this.drawDraggles(); //TODO this happens before there are mated pairs?
    // this.cdr.detectChanges();
    //TODO fix this only loading once
  }

  drawDraggles(){
    let canvasArray = this.canvases.toArray();
    let canvasNumTracker = 0;
    for(let i = 0; i<this.matedPairSubpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.matedPairSubpopulations[i];
      for(let j = 0; j<currentSubpopulation.getMatedPairs().length; j++){
        let currentMatedPair = currentSubpopulation.getMatedPairs()[j];
        // console.log(canvasNumTracker);
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual1().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
        // console.log(canvasNumTracker);
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual2().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
      }
    }
  }

  makeBabies(individual1: Organism, individual2: Organism, subpopNum: number, matedPair: MatedPair){ //TODO can simplify this signature //TODO move some of this into population manager?
    let baby = this.individualGenerationService.makeOffspring(individual1, individual2);
    this.openSnackBar(baby);
    matedPair.addOffspring(baby);
    this.popManager.addOffspringToSubpop(subpopNum, baby);
    //check whether all possible babies have been made and if they have, make the proper accommodations
    let nextGenMetaPopObservable = this.popManager.nextGenMetapopulation.pipe(take(1));
    let currentGenMetaPopObservable = this.popManager.currentMetaPopulation.pipe(take(1));
    forkJoin([nextGenMetaPopObservable, currentGenMetaPopObservable]).subscribe(results=>{ //TODO decide whether combineLatest is better here
      let observedNumBabies = this.popManager.getNumberOfBabiesObservedBySubpop(results[0],subpopNum);
      let expectedNumBabies = this.popManager.getNumberOfBabiesExpectedBySubpop(results[1],subpopNum, 2);
      if(observedNumBabies == expectedNumBabies){
        results[0].getSubpopulation(subpopNum).markCompleted();
        let subpops = results[0].getSubpopulations();
        let incompleteCount = 0;
        for(let i = 0; i<subpops.length; i++){
          if(!subpops[i].isCompleted()){
            incompleteCount ++;
          }
        }
        if(incompleteCount == 0 && this.allSubpopulationsExpectedHaveBeenCreated(results[0], results[1])){
          results[0].completeMetapopulation();
          let metapop = results[0];
          this.popManager.nextGenMetapopulationSource.next(metapop);
          this.popManager.addToMetapopulationGenerations(metapop);
          this.popManager.metapopulationGenerations.pipe(take(1)).subscribe(metapopoulations=>{
          });
          this.hideNextButton = false;
          // this.popManager.incrementCurrentGenNum();
          this.popManager.currentMetapopulationSource.next(metapop);
        }
      }
    });
  }

  openSnackBar(baby: Organism) {
    this.snackBar.open(baby.getOrganismName() + " has been born! It has one " + baby.getGeneByName("spot color").getGenotype().getAllele1() + " allele and one " + baby.getGeneByName("spot color").getGenotype().getAllele2() + " allele", '',{duration: 2000,});
  }

  allSubpopulationsExpectedHaveBeenCreated(currentMetapop: Metapopulation, nextGenMetapop: Metapopulation){
    return currentMetapop.getSubpopulations().length == nextGenMetapop.getSubpopulations().length;
  }

  nextStep(stepperMain: MatStepper){
    console.log("got here nextStep in matings-display.component");
    this.popManager.isThisTheLastGeneration().pipe(takeUntil(this.ngUnsubscribe)).subscribe(isThisTheLastGeneration =>{
      if(isThisTheLastGeneration){
        this.doneRepeatingEmitter.emit(true);
      } else{
        this.repeatMatingEmitter.emit(true); //TODO instead of true, only emit true if numGen max not reached
      }
    });
  }

}
