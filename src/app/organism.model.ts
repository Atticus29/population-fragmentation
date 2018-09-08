import { Genotype } from './genotype.model';
import { Gene } from './gene.model';

export class Organism {
  //Assume diploid for now
  private organismId: string;

  constructor(public organismName: string, public genes:Array<Gene>) {
    
  }

  getOrganismName(){
    return this.organismName;
  }

  getGeneByName(geneName: string): Gene{
    let returnVal = null; //TODO improve this
    for(let i=0; i<this.genes.length; i++){
      if(this.genes[i].getGeneName() === geneName){
        returnVal = this.genes[i];
      }
    }
    return returnVal; //TODO will only return the last match currently and there's nothing to ensure that there can only be one gene by a given name
  }
}
