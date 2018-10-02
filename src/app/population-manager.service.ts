import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';
import { Metapopulation } from './metapopulation.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IndividualGenerationService } from './individual-generation.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  private currentMetapopulationSource: BehaviorSubject<Metapopulation> = new BehaviorSubject<Metapopulation>(new Metapopulation(new Array<Population>()));
  currentMetaPopulation = this.currentMetapopulationSource.asObservable();

  private currentPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  currentPopulation = this.currentPopulationSource.asObservable();

  //TODO accommodate different generations!
  private newGenerationPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  newGenerationPopulation = this.currentPopulationSource.asObservable();
  private generationsSouce: BehaviorSubject<Population[]> = new BehaviorSubject<Population[]>(new Array<Population>());
  generations = this.generationsSouce.asObservable();

  private populationWithPotentiallyNewIndividual: Population = null;
  constructor(private individualGenerator: IndividualGenerationService) { }

  clearPopulation(){
    let emptyPopulation = new Population([]);
    let emptyGenerations = new Array<Population>();
    this.currentPopulationSource.next(emptyPopulation);
    this.generationsSouce.next(emptyGenerations);
  }

  addToGenerations(population: Population){
    this.generationsSouce.pipe(take(1)).subscribe((populations: Array<Population>)=>{
      populations.push(population);
      this.generationsSouce.next(populations);
    });
  }

  getScrambledPopulation(){
    return Observable.create(obs => {
      this.currentPopulationSource.pipe(take(1)).subscribe((population: Population)=>{
        let individuals = population.getIndividuals();
        console.log("before");
        console.log(individuals);
        let shuffledIndividuals = this.shuffle(individuals);
        console.log("after");
        console.log(shuffledIndividuals);
        obs.next(shuffledIndividuals);
      });
    });
  }

  shuffle(a) {
    //TODO this currently does not work as expected
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  allGenotypes(set, ploidy){
    let allGenotypes = this.allHomozygousCases(set, ploidy);
    allGenotypes = allGenotypes.concat(this.allHeterozygousCases(set, ploidy));
    return allGenotypes;
  }

  allHomozygousCases(set, ploidy){
    let homozgousGenotypes = [];
    set.forEach(setMember =>{
      homozgousGenotypes.push([setMember, setMember]);
    })
    return homozgousGenotypes;
  }

  allHeterozygousCases(set, ploidy) { //stolen from https://gist.github.com/axelpale/3118596
	var i, j, combs, head, tailcombs;
	if (ploidy > set.length || ploidy <= 0) {
		return [];
	}
	if (ploidy == set.length) {
		return [set];
	}
	if (ploidy == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - ploidy + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = this.allHeterozygousCases(set.slice(i + 1), ploidy - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;

  }

  testMethod(){
    var allArrays = [['blue', 'green', 'magenta'],['blue', 'green', 'magenta']]
    let results = this.allHeterozygousCases(allArrays,2);
    console.log(results);
  }

  generateMetaPopulation(alleleFrequencies: Array<number>, popSize: number, fragNum: number){
    for(let i = 0; i < fragNum; i++){
      // let subpopulation = new Population();
    }
  }

  generatePopulation(alleleFrequencyBlue: number, alleleFrequencyGreen: number, alleleFrequencyMagenta: number, popSize: number){
    //TODO generalize this for an array of allele frequencies
    //TODO generalize to different populationSources
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

    //check the count
    this.currentPopulationSource.pipe(take(1)).subscribe((population: Population)=>{
    // console.log(population);
    if(population.getIndividuals().length<popSize){
      console.log("your population is too small!");
      this.addRandomIndividualGivenPopAlleleFrequencies([alleleFrequencyBlue, alleleFrequencyGreen, alleleFrequencyMagenta], ["blue", "green", "magenta"]);
    }
    if(population.getIndividuals().length>popSize){
      console.log("your population is too big! Weird!")
      this.removeAnIndividualAtRandomFromPopulation();
    }
  });
  //can't do a while loop instead of an if statement above, because I don't think the addRandomIndividualGivenPopAlleleFrequencies emits in time to ever be falsified by the while statement?
  this.currentPopulationSource.pipe(take(1)).subscribe((population: Population)=>{
  // console.log(population);
  if(population.getIndividuals().length<popSize){
    console.log("your population is too small!");
    this.addRandomIndividualGivenPopAlleleFrequencies([alleleFrequencyBlue, alleleFrequencyGreen, alleleFrequencyMagenta], ["blue", "green", "magenta"]);
  }
  if(population.getIndividuals().length>popSize){
    console.log("your population is too big! Weird!")
    this.removeAnIndividualAtRandomFromPopulation();
  }
});

  //TODO unclear if I can add this into the subscription above
  this.currentPopulationSource.pipe(take(1)).subscribe((population: Population) =>{
    this.addToGenerations(population);
  });
}

removeAnIndividualAtRandomFromPopulation(){
  //TODO generalize to different populationSources
  this.currentPopulationSource.pipe(take(1)).subscribe((population: Population) =>{
    let randomIndex = Math.floor(Math.random()*population.getIndividuals().length) + 1;
    let newIndividualArray: Array<Organism> = population.getIndividuals();
    newIndividualArray.splice(randomIndex,1);
    let newPopulation: Population = new Population(newIndividualArray);
    this.currentPopulationSource.next(newPopulation);
  });
}

addRandomIndividualGivenPopAlleleFrequencies(alleleFrequencies: Array<number>, alleleNames: Array<string>){
  //TODO generalize to different populationSources
  //TODO I am not 100% convinced that this works as expected
  // console.log(alleleFrequencies);
  let randomNumberBetween0And1 = Math.random();
  let cumulativeProbability = 0;
  let allele1 = "errorInAddRandomIndividualGivenPopAlleleFrequencies";
  let allele2 = "errorInAddRandomIndividualGivenPopAlleleFrequencies";
  for(let i = 0; i<alleleFrequencies.length; i++){
    // console.log(cumulativeProbability);
    // console.log(cumulativeProbability + alleleFrequencies[i]);
    if(randomNumberBetween0And1 >= cumulativeProbability && randomNumberBetween0And1 <= cumulativeProbability+alleleFrequencies[i]){
    //if the random number falls in this probability space
    allele1 = alleleNames[i];
    // console.log(allele1);
  }
  cumulativeProbability = cumulativeProbability + alleleFrequencies[i];
}

randomNumberBetween0And1 = Math.random();
// console.log(randomNumberBetween0And1);
cumulativeProbability = 0;
for(let i = 0; i<alleleFrequencies.length; i++){
  // console.log(cumulativeProbability);
  // console.log(cumulativeProbability + alleleFrequencies[i]);
  if(randomNumberBetween0And1 >= cumulativeProbability && randomNumberBetween0And1 <= cumulativeProbability+alleleFrequencies[i]){
  //if the random number falls in this probability space
  // console.log("this should also only happen once");
  allele2 = alleleNames[i];
  cumulativeProbability += alleleFrequencies[i];
  // console.log(allele2);
}
cumulativeProbability = cumulativeProbability + alleleFrequencies[i];
}
let newIndividual: Organism = this.individualGenerator.makeIndividual(allele1, allele2);
this.addOrganismToPopulation(newIndividual);
}

addOrganismToPopulation(organism: Organism){
  //TODO generalize to different populationSources
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
