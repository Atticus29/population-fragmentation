// import { Population } from './population.model';
import { PopulationOfMatedPairs } from './populationOfMatedPairs.model';
import { MatedPair } from './mated-pair.model';

export class MetapopulationOfMatedPairs {
  private subpopulations: Array<PopulationOfMatedPairs>; //TODO fix should be populations Of Mated Pairs
  constructor(subpopulations: Array<PopulationOfMatedPairs>){
    this.subpopulations = subpopulations;
  }

  getSubpopulations(){
    return this.subpopulations;
  }

  getSubpopulation(num: number){
    return this.subpopulations[num];
  }

  addSubpopulation(subpopulation: PopulationOfMatedPairs){
    this.subpopulations.push(subpopulation);
  }
}
