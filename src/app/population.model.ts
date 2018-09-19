import { Organism } from './organism.model';

export class Population {
  private individuals: any;
  constructor(individuals: Organism[]){
    this.individuals = individuals;
  }

  getIndividuals(){
    return this.individuals;
  }
}
