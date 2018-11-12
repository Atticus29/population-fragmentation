import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';
import { Organism } from '../organism.model';
import { Metapopulation } from '../metapopulation.model';
import { PopulationOfMatedPairs } from '../populationOfMatedPairs.model';
import { take, takeUntil } from 'rxjs/operators';
import { DrawingService } from '../drawing.service';
import { ChangeDetectorRef } from '@angular/core';
import { IndividualGenerationService } from '../individual-generation.service';
import { Observable, forkJoin, Subject } from "rxjs";

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('matingcanvases') canvases: QueryList<ElementRef>;
  private matedPairSubpopulations: Array<PopulationOfMatedPairs> = new Array<PopulationOfMatedPairs>();
  private hideNextButton: boolean = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private popManager: PopulationManagerService, private ds: DrawingService, private cdr: ChangeDetectorRef, private individualGenerationService: IndividualGenerationService) { }

  ngOnInit() {
    this.popManager.currentMetapopulationOfMatedPairs.pipe(takeUntil(this.ngUnsubscribe)).subscribe(metapopulationOfMatedPairs =>{
      this.matedPairSubpopulations = metapopulationOfMatedPairs.getSubpopulations();
      if(this.matedPairSubpopulations.length > 0){
        this.cdr.detectChanges(); //TODO try without the detect changes
        this.drawDraggles(); //TODO this might be buggy
        this.cdr.detectChanges();
      }
      // console.log(this.matedPairSubpopulations);
    });

    // this.popManager.metapopulationGenerations.pipe(take(1)).subscribe(metapopulations =>{
    //   console.log(metapopulations);
    // });
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
    // this.drawDraggles(); //TODO this happens before there are mated pairs?
    // this.cdr.detectChanges();
    //TODO fix this only loading once
  }

  drawDraggles(){
    console.log("drawDraggles from matings-display component entered");
    // console.log(this.canvases);
    let canvasArray = this.canvases.toArray();
    // console.log(canvasArray);
    let canvasNumTracker = 0;
    for(let i = 0; i<this.matedPairSubpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.matedPairSubpopulations[i];
      for(let j = 0; j<currentSubpopulation.getMatedPairs().length; j++){
        let currentMatedPair = currentSubpopulation.getMatedPairs()[j];
        // let canvasNum = (i)*currentMatedPair.getIndividual1().length + j;
        // console.log(currentMatedPair.getIndividual1().getGeneByName("spot color").getGenotype());

        console.log(canvasNumTracker);
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual1().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
        // canvasNum = (i)*currentMatedPair.getIndividual2().length + j + 1;
        // console.log(currentMatedPair.getIndividual2().getGeneByName("spot color").getGenotype());

        console.log(canvasNumTracker);
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual2().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
      }
    }
  }

  makeBabies(individual1: Organism, individual2: Organism, subpopNum: number, matedPair: MatedPair){ //TODO can simplify this signature //TODO move some of this into population manager?
    let baby = this.individualGenerationService.makeOffspring(individual1, individual2);
    matedPair.addOffspring(baby);
    this.popManager.addOffspringToSubpop(subpopNum, baby);

    //check whether all possible babies have been made and if they have, make the proper accommodations
    let nextGenMetaPopObservable = this.popManager.nextGenMetapopulation.pipe(take(1));
    let currentGenMetaPopObservable = this.popManager.currentMetaPopulation.pipe(take(1));
    console.log("before the forkJoin");
    forkJoin([nextGenMetaPopObservable, currentGenMetaPopObservable]).subscribe(results=>{
      console.log("inside the forkJoin");
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
            // console.log(metapopoulations);
          });
          //TODO make a next button available
          this.hideNextButton = false;
        }
      }
    });
    // console.log("Mark you got here");
    // this.cdr.detectChanges();
    // this.drawDraggles(); //TODO I think remove
    // this.cdr.detectChanges();
  }

  allSubpopulationsExpectedHaveBeenCreated(currentMetapop: Metapopulation, nextGenMetapop: Metapopulation){
    return currentMetapop.getSubpopulations().length == nextGenMetapop.getSubpopulations().length;
  }

}
