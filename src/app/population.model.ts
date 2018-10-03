import { Organism } from './organism.model';

export class Population {
  private individuals: any;
  private popName: string = "default";
  constructor(individuals: Organism[]){
    this.individuals = individuals;
  }

  // constructor(indviduals: Organism[], popName: string){
  //   this.individuals = individuals;
  //   this.popName = popName;
  // }

  getIndividuals(){
    return this.individuals;
  }

  addIndividual(individual: Organism){
    this.individuals.push(individual);
  }
}
