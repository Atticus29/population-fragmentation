import { Population } from './population.model';

export class Metapopulation {
  private subpopulations: Array<Population>;
  private  generationNumber: number;
  private complete: boolean = false;
  constructor(subpopulations: Array<Population>, genNum: number){
    this.subpopulations = subpopulations;
    this.generationNumber = genNum;
  }

  setGenerationNumber(genNum: number){
    this.generationNumber = genNum;
  }

  completeMetapopulation(){
    this.complete = true;
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
