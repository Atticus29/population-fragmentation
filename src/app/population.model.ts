import { Organism } from './organism.model';

export class Population {
  private individuals: any;
  constructor(individuals: Organism[]){
  }

  getIndividuals(){
    return this.individuals;
  }
}
