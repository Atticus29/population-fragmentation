import { Genotype } from './genotype.model';

export class Gene {

  constructor(public geneName: string, public genotype: Genotype) {}

  // getGene(): Gene{
  //   return this;
  // }

  getGeneName(): string{
    return this.geneName;
  }

  getGenotype(): Genotype{
    return this.genotype;
  }
}
