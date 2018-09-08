import { Organism } from './organism.model';

export class Population {
  private individuals: Array<Organism>;

  constructor(individuals: Array<Organism>){
    this.individuals = individuals;
  }

  getIndividuals(){
    return this.individuals;
  }
}
