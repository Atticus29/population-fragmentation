import { Component, OnInit } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';
import { PopulationOfMatedPairs } from '../populationOfMatedPairs.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit {
  private matedPairSubpopulations: Array<PopulationOfMatedPairs> = new Array<PopulationOfMatedPairs>();
  constructor(private popManager: PopulationManagerService) { }

  ngOnInit() {
    this.popManager.currentMetapopulationOfMatedPairs.pipe(take(1)).subscribe(metapopulationOfMatedPairs =>{
      this.matedPairSubpopulations = metapopulationOfMatedPairs.getSubpopulations();
      console.log("hieeee!");
      console.log(this.matedPairSubpopulations);
    });
  }

}
