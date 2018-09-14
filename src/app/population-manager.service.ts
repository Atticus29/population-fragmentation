import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  private currentPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  private currentPopulation = this.currentPopulationSource.asObservable();
  constructor() { }

  addOrganismToPopulation(organism: Organism){
    //TODO how to add an element to an observable array?
    // this.currentPopulation.getIndividuals().push(organism);
  }
}
