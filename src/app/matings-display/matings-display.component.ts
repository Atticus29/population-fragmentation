import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';
import { Organism } from '../organism.model';
import { Metapopulation } from '../metapopulation.model';
import { PopulationOfMatedPairs } from '../populationOfMatedPairs.model';
import { take } from 'rxjs/operators';
import { DrawingService } from '../drawing.service';
import { ChangeDetectorRef } from '@angular/core';
import { IndividualGenerationService } from '../individual-generation.service';
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvases') canvases: QueryList<ElementRef>;
  private matedPairSubpopulations: Array<PopulationOfMatedPairs> = new Array<PopulationOfMatedPairs>();
  constructor(private popManager: PopulationManagerService, private ds: DrawingService, private cdr: ChangeDetectorRef, private individualGenerationService: IndividualGenerationService) { }

  ngOnInit() {
    this.popManager.currentMetapopulationOfMatedPairs.pipe(take(1)).subscribe(metapopulationOfMatedPairs =>{
      this.matedPairSubpopulations = metapopulationOfMatedPairs.getSubpopulations();
      console.log("hieeee!");
      console.log(this.matedPairSubpopulations);
    });
  }

  ngAfterViewInit(){
    this.drawDraggles();
    this.cdr.detectChanges();
    //TODO fix this only loading once
  }

  drawDraggles(){
    console.log("does this even happen?");
    let canvasArray = this.canvases.toArray();
    let canvasNumTracker = 0;
    for(let i = 0; i<this.matedPairSubpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.matedPairSubpopulations[i];
      for(let j = 0; j<currentSubpopulation.getMatedPairs().length; j++){
        let currentMatedPair = currentSubpopulation.getMatedPairs()[j];
        // let canvasNum = (i)*currentMatedPair.getIndividual1().length + j;
        console.log(currentMatedPair.getIndividual1().getGeneByName("spot color").getGenotype());
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual1().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
        // canvasNum = (i)*currentMatedPair.getIndividual2().length + j + 1;
        console.log(currentMatedPair.getIndividual2().getGeneByName("spot color").getGenotype());
        this.ds.drawLizard(canvasArray[canvasNumTracker], currentMatedPair.getIndividual2().getGeneByName("spot color").getGenotype());
        canvasNumTracker ++;
      }
    }
  }

  makeBabies(individual1: Organism, individual2: Organism, subpopNum: number, matedPair: MatedPair){ //TODO can simplify this signature //TODO move some of this into population manager?
    let baby = this.individualGenerationService.makeOffspring(individual1, individual2);
    matedPair.addOffspring(baby);
    this.popManager.addOffspringToSubpop(subpopNum, baby);
    //TODO use population manager to add the baby to the new generation?

    //check whether all possible babies have been made
    let nextGenMetaPopObservable = this.popManager.nextGenMetapopulation.pipe(take(1));
    let currentGenMetaPopObservable = this.popManager.currentMetaPopulation.pipe(take(1));
    forkJoin([nextGenMetaPopObservable, currentGenMetaPopObservable]).subscribe(results=>{
      let observedNumBabies = this.popManager.getNumberOfBabiesObserved(results[0]);
      // console.log("observed");
      // console.log(observedNumBabies);
      let expectedNumBabies = this.popManager.getNumberOfBabiesExpected(results[1], 2);
      // console.log("expected");
      // console.log(expectedNumBabies);
      if(observedNumBabies == expectedNumBabies){
        results[0].getSubpopulation(subpopNum).markCompleted();
        let subpops = results[0].getSubpopulations();
        let incompleteCount = 0;
        for(let i = 0; i<subpops.length; i++){
          if(!subpops[i].isCompleted()){
            incompleteCount ++;
          }
        }
        if(incompleteCount == 0){
          results[0].completeMetapopulation();
          let metapop = results[0];
          console.log(metapop);
          //TODO re-emit the metapop?
          //TODO add to generations behavior subject
        }
      }
    });
    //TODO mark the new generation as completed if every subpopulation is completed
    // this.popManager.addOffspringToNewGeneration(subpopNum, baby);
  }

}
