import { Component, OnInit } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';

@Component({
  selector: 'app-mate',
  templateUrl: './mate.component.html',
  styleUrls: ['./mate.component.css']
})
export class MateComponent implements OnInit {
  private matedPairs: Array<MatedPair> = new Array<MatedPair>();

  constructor(private popManager: PopulationManagerService) { }

  ngOnInit() {
    this.popManager.currentPopulation.subscribe((population: Population) =>{
      //TODO do things with mated pairs??
    });
  }

}
