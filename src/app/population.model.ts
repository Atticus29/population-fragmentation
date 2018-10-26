import { Organism } from './organism.model';

export class Population {
  private individuals: any;
  private popName: string = "default";
  private completed: boolean = false;
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

  markCompleted(){
    this.completed = true;
  }

  isCompleted(){
    return this.completed;
  }

  addIndividual(individual: Organism){
    this.individuals.push(individual);
  }
}
