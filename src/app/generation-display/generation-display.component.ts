import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Metapopulation } from '../metapopulation.model';
import { PopulationManagerService } from '../population-manager.service';

@Component({
  selector: 'app-generation-display',
  templateUrl: './generation-display.component.html',
  styleUrls: ['./generation-display.component.css']
})
export class GenerationDisplayComponent implements OnInit {
  private remainingGenerations: Array<Metapopulation>;
  constructor(private popMananger: PopulationManagerService) { }

  ngOnInit() {
    this.popMananger.metapopulationGenerations.pipe(take(1)).subscribe(generations =>{
      console.log("got into generation display component")
      console.log(generations);
      this.remainingGenerations = generations; //TODO this is not true fix
    });
  }

}
