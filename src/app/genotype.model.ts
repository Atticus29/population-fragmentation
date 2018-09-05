export class Genotype {

  constructor(public allele1: string, public allele2: string) {}

  getGenotypeArray(): Array<string>{
    let returnArray = new Array<string>();
    returnArray.push(this.allele1);
    returnArray.push(this.allele2);
    return returnArray;
  }
}
