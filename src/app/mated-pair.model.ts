import { Organism } from './organism.model';

export class MatedPair {
  private individual1: Organism;
  private individual2: Organism;
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
}
