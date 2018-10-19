import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';
import { PopulationOfMatedPairs } from '../populationOfMatedPairs.model';
import { take } from 'rxjs/operators';
import { DrawingService } from '../drawing.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvases') canvases: QueryList<ElementRef>;
  private matedPairSubpopulations: Array<PopulationOfMatedPairs> = new Array<PopulationOfMatedPairs>();
  constructor(private popManager: PopulationManagerService, private ds: DrawingService, private cdr: ChangeDetectorRef) { }

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

  makeBabies(){
    console.log("makeBabies");
  }

}
