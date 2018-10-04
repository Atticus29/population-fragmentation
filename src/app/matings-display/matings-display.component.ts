import { Component, OnInit } from '@angular/core';
import { PopulationManagerService } from '../population-manager.service';
import { MatedPair } from '../mated-pair.model';
import { Population } from '../population.model';

@Component({
  selector: 'app-matings-display',
  templateUrl: './matings-display.component.html',
  styleUrls: ['./matings-display.component.css']
})
export class MatingsDisplayComponent implements OnInit {
  private matedPairs: Array<MatedPair> = new Array<MatedPair>();
  constructor() { }

  ngOnInit() {
  }

}
