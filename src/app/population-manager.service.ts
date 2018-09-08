import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  private currentPopulation: Population = new Population(new Array<Organism>());
  constructor() { }

  addOrganismToPopulation(organism: Organism){
    this.currentPopulation.getIndividuals().push(organism);
  }
}
