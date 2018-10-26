import { Organism } from './organism.model';

export class MatedPair {
  private individual1: Organism;
  private individual2: Organism;
  private offspring: Organism[] = new Array<Organism>();
  private MAX_NUM_PER_MATED_PAIR: number = 2; //TODO don't hard code this!
  constructor(individual1: Organism, individual2: Organism) {
    this.individual1 = individual1;
    this.individual2 = individual2;
  }

  getIndividual1(): Organism{
    return this.individual1;
  }

  getIndividual2(): Organism{
    return this.individual2;
  }

  babiesMaxedOut(): boolean{
    return (this.offspring.length >= this.MAX_NUM_PER_MATED_PAIR);
  }

  addOffspring(child: Organism){
    this.offspring.push(child);
  }

  getNumOffspring(): number{
    return this.offspring.length;
  }
}
