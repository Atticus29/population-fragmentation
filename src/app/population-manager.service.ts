import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  private currentPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  currentPopulation = this.currentPopulationSource.asObservable();
  private newPop: Population = null;
  constructor() { }

  addOrganismToPopulation(organism: Organism){
    this.currentPopulationSource.pipe(take(1))
    .subscribe((population: Population) => {
      if(population.getIndividuals()){
        this.newPop = new Population([...population.getIndividuals(), organism]);
      } else {
        this.newPop = new Population([organism]);
      }
      this.currentPopulationSource.next(this.newPop);
  });

  // this.currentPopulationSource.next(new Population(new Array<Organism>(organism)));

  //TODO how to add an element to an observable array?
  // this.currentPopulation.getIndividuals().push(organism);
}
}
