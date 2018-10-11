import { Population } from './population.model';
import { MatedPair } from './mated-pair.model';

export class MetapopulationOfMatedPairs {
  private subpopulations: Array<MatedPair>; //TODO fix should be populations Of Mated Pairs
  constructor(subpopulations: Array<MatedPair>){
    this.subpopulations = subpopulations;
  }

  getSubpopulations(){
    return this.subpopulations;
  }

  getSubpopulation(num: number){
    return this.subpopulations[num];
  }

  addSubpopulation(subpopulation: Array<MatedPair>){
    this.subpopulations.push(subpopulation);
  }
}
