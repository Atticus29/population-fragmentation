import { Genotype } from './genotype.model';

export class Gene {

  constructor(public geneName: string, public genotype: Genotype) {}

  getGeneName(): string{
    return this.geneName;
  }

  getGenotype(): Genotype{
    return this.genotype;
  }
}
