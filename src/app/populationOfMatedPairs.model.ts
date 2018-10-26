import { MatedPair } from './mated-pair.model';

export class PopulationOfMatedPairs {
  private matedPairs: MatedPair[]; //TODO maybe could be more specific
  private popName: string = "default";
  constructor(matedPairs: MatedPair[]){
    this.matedPairs = matedPairs;
  }

  getMatedPairs(){
    return this.matedPairs;
  }

  addMatedPair(pair: MatedPair){
    this.matedPairs.push(pair);
  }
}
