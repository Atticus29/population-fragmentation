import { Population } from './population.model';

export class Metapopulation {
  private subpopulations: Array<Population>;
  constructor(subpopulations: Array<Population>){
    this.subpopulations = subpopulations;
  }

  getSubpopulations(){
    return this.subpopulations;
  }

  getSubpopulation(num: number){
    return this.subpopulations[num];
  }

  addSubpopulation(subpopulation: Population){
    this.subpopulations.push(subpopulation);
  }
}
