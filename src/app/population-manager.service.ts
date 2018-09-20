import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IndividualGenerationService } from './individual-generation.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  //TODO accommodate different generations!
  private currentPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  currentPopulation = this.currentPopulationSource.asObservable();
  private newGenerationPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  newGenerationPopulation = this.currentPopulationSource.asObservable();
  private populationWithPotentiallyNewIndividual: Population = null;
  constructor(private individualGenerator: IndividualGenerationService) { }

  generatePopulation(alleleFrequencyBlue: number, alleleFrequencyGreen: number, alleleFrequencyMagenta: number, popSize: number){

    //assuming Hardy-Weinberg Equilibrium
    let blueHomozygousCount = Math.round(alleleFrequencyBlue * alleleFrequencyBlue * popSize);
    for (let i = 0; i<blueHomozygousCount; i++){
      let individual = this.individualGenerator.makeIndividual("blue", "blue");
      this.addOrganismToPopulation(individual);
    }
    let greenHomozygousCount = Math.round(alleleFrequencyGreen * alleleFrequencyGreen * popSize);
    for (let i = 0; i<greenHomozygousCount; i++){
      let individual = this.individualGenerator.makeIndividual("green", "green");
      this.addOrganismToPopulation(individual);
    }
    let magentaHomozygousCount = Math.round(alleleFrequencyMagenta * alleleFrequencyMagenta * popSize);
    for (let i = 0; i<magentaHomozygousCount; i++){
      let individual = this.individualGenerator.makeIndividual("magenta", "magenta");
      this.addOrganismToPopulation(individual);
    }
    let blueGreenHeterozygoteCount = Math.round(2* alleleFrequencyBlue * alleleFrequencyGreen * popSize);
    for (let i = 0; i<blueGreenHeterozygoteCount; i++){
      let individual = this.individualGenerator.makeIndividual("blue", "green");
      this.addOrganismToPopulation(individual);
    }
    let blueMagentaHeterozygoteCount = Math.round(2* alleleFrequencyBlue * alleleFrequencyMagenta * popSize);
    for (let i = 0; i<blueMagentaHeterozygoteCount; i++){
      let individual = this.individualGenerator.makeIndividual("blue", "magenta");
      this.addOrganismToPopulation(individual);
    }
    let greenMagentaHeterozygoteCount = Math.round(2* alleleFrequencyGreen * alleleFrequencyMagenta * popSize);
    for (let i = 0; i<greenMagentaHeterozygoteCount; i++){
      let individual = this.individualGenerator.makeIndividual("green", "magenta");
      this.addOrganismToPopulation(individual);
    }
  }

  addOrganismToPopulation(organism: Organism){
    this.currentPopulationSource.pipe(take(1))
    .subscribe((population: Population) => {
      if(population.getIndividuals()){
        this.populationWithPotentiallyNewIndividual = new Population([...population.getIndividuals(), organism]);
      } else {
        this.populationWithPotentiallyNewIndividual = new Population([organism]);
      }
      this.currentPopulationSource.next(this.populationWithPotentiallyNewIndividual);
    });
  }

  calculateAlleleFrequency(alleleName: string, doYouWantNewGeneration: boolean){
    let alleleOfInterestCount = 0;
    if(doYouWantNewGeneration){
      //TODO do this for new generation
      return Observable.create(obs => {
        this.newGenerationPopulationSource.pipe(take(1))
        .subscribe((population: Population) => {
          let individuals = population.getIndividuals();
          let popSize = individuals.length;
          individuals.forEach(individual =>{
            let allele1 = individual.getGeneByName("spot color").getGenotype().getAllele1();
            let allele2 = individual.getGeneByName("spot color").getGenotype().getAllele2();
            if (allele1 === alleleName){alleleOfInterestCount++;}
            if (allele2 === alleleName){alleleOfInterestCount++;}
          });
          obs.next(alleleOfInterestCount/(2*popSize));
        });
      });
    } else{
      return Observable.create(obs =>{
      this.currentPopulationSource.pipe(take(1))
      .subscribe((population: Population) => {
        let individuals = population.getIndividuals();
        let popSize = individuals.length;
        individuals.forEach(individual =>{
          let allele1 = individual.getGeneByName("spot color").getGenotype().getAllele1();
          let allele2 = individual.getGeneByName("spot color").getGenotype().getAllele2();
          if (allele1 === alleleName){alleleOfInterestCount++;}
          if (allele2 === alleleName){alleleOfInterestCount++;}
        });
        obs.next(alleleOfInterestCount/(2*popSize));
      });
      });

    }
  }
}
