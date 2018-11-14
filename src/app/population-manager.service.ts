import { Injectable } from '@angular/core';
import { Organism } from './organism.model';
import { Population } from './population.model';
import { Metapopulation } from './metapopulation.model';
import { MatedPair } from './mated-pair.model';
import { PopulationOfMatedPairs } from './populationOfMatedPairs.model';
import { MetapopulationOfMatedPairs } from './metapopulationOfMatedPairs.model';
import { Subject, BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IndividualGenerationService } from './individual-generation.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationManagerService {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private eligibleBachelorsAbsentSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  eligibleBachelorsAbsent = this.eligibleBachelorsAbsentSource.asObservable();

  private currentMetapopulationSource: BehaviorSubject<Metapopulation> = new BehaviorSubject<Metapopulation>(new Metapopulation(new Array<Population>(), 0));
  currentMetaPopulation = this.currentMetapopulationSource.asObservable();

  private currentMetapopulationOfMatedPairsSource: BehaviorSubject<MetapopulationOfMatedPairs> = new BehaviorSubject<MetapopulationOfMatedPairs>(new MetapopulationOfMatedPairs(new Array<PopulationOfMatedPairs>()));
  currentMetapopulationOfMatedPairs = this.currentMetapopulationOfMatedPairsSource.asObservable();

  nextGenMetapopulationSource: BehaviorSubject<Metapopulation> = new BehaviorSubject<Metapopulation>(new Metapopulation(new Array<Population>(), 0));
  nextGenMetapopulation = this.nextGenMetapopulationSource.asObservable();

  private currentPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  currentPopulation = this.currentPopulationSource.asObservable();

  //TODO accommodate different generations!
  private newGenerationPopulationSource: BehaviorSubject<Population> = new BehaviorSubject<Population>(new Population(new Array<Organism>()));
  newGenerationPopulation = this.currentPopulationSource.asObservable();
  private generationsSouce: BehaviorSubject<Population[]> = new BehaviorSubject<Population[]>(new Array<Population>());
  generations = this.generationsSouce.asObservable();

  metapopulationGenerationsSouce: BehaviorSubject<Metapopulation[]> = new BehaviorSubject<Metapopulation[]>(new Array<Metapopulation>());
  metapopulationGenerations = this.metapopulationGenerationsSouce.asObservable();

  private populationWithPotentiallyNewIndividual: Population = null;
  constructor(private individualGenerator: IndividualGenerationService) { }

  isEveryoneInTheMetaPopulationMated(){
    return Observable.create(obs => {
      let currentMetaPopObservable = this.currentMetaPopulation.pipe(takeUntil(this.ngUnsubscribe));
      console.log("got here");
      console.log(currentMetaPopObservable);
      let currentMetapopulationOfMatedPairsObservable = this.currentMetapopulationOfMatedPairs.pipe(takeUntil(this.ngUnsubscribe));
      console.log("got here two");
      combineLatest([currentMetaPopObservable, currentMetapopulationOfMatedPairsObservable]).subscribe(results=>{
        console.log("got here three");
        let metaPop: Metapopulation = results[0];
        let metaPopMatedPairs: MetapopulationOfMatedPairs = results[1];
        console.log(metaPopMatedPairs);
        console.log("isEveryoneInTheMetaPopulationMated");
        let expectedNumMatedPairs: number = null;
        let observedNumMatedPairs: number = null;
        // for(let i = 0; i<metaPop.getSubpopulations().length; i++){
        //   let currentSubpop = metaPop.getSubpopulation(i);
        //   expectedNumMatedPairs += Math.floor(currentSubpop.getIndividuals().length/2);
        // }
        // for(let j=0; j<metaPopMatedPairs.getSubpopulations().length; j++){
        //   let currentSubpopMatedPairs = metaPopMatedPairs.getSubpopulation(j);
        //   observedNumMatedPairs += currentSubpopMatedPairs.getMatedPairs().length;
        // }
        console.log(expectedNumMatedPairs);
        console.log(observedNumMatedPairs);
        if(expectedNumMatedPairs >= 0 && observedNumMatedPairs >= 0 && observedNumMatedPairs == expectedNumMatedPairs){
          obs.next(true);
        } else {
          obs.next(false);
        }
      });
    });
  }

  getCurrentGenerationNumberObservable(){
    return Observable.create(obs => {
      this.metapopulationGenerations.pipe(take(1)).subscribe((metapopulations: Metapopulation[])=>{
        let number = metapopulations.length - 1;
        obs.next(number);
      });
    });
  }

  getNumberOfBabiesExpected(metapopulation: Metapopulation, maxNumPerMatedPair: number){
    let fragNum = metapopulation.getSubpopulations().length;
    let numPairsPerFrag = Math.floor(metapopulation.getSubpopulation(0).getIndividuals().length / 2);
    return(fragNum * numPairsPerFrag * maxNumPerMatedPair);
  }

  getNumberOfBabiesExpectedBySubpop(metapopulation: Metapopulation, subPopNum: number, maxNumPerMatedPair: number){
    let numPairsPerFrag = Math.floor(metapopulation.getSubpopulation(subPopNum).getIndividuals().length / 2);
    return(numPairsPerFrag * maxNumPerMatedPair);
  }

  getNumberOfBabiesObserved(nextGenMetapopulation: Metapopulation){
    let runningBabyCount = 0;
    for(let i = 0; i<nextGenMetapopulation.getSubpopulations().length; i++){
      runningBabyCount += nextGenMetapopulation.getSubpopulation(i).getIndividuals().length;
    }
    return runningBabyCount;
  }

  getNumberOfBabiesObservedBySubpop(nextGenMetapopulation: Metapopulation, subpopNum: number){
    return nextGenMetapopulation.getSubpopulation(subpopNum).getIndividuals().length;
  }

  generateMetaPopulation(alleleFrequencies: Array<number>,alleleNames: Array<string>, popSize: number, fragNum: number){
    let metaPopulation = new Metapopulation([], 0);
    for(let i = 0; i < fragNum; i++){
      let subpopulation = null;
      //rounds down subpopulations to the same number
      let fragPopSize = Math.floor(popSize/fragNum);
      if(fragNum < 10){
        subpopulation = this.generateSubpopulationUsingProbability(alleleFrequencies, alleleNames, fragPopSize); //TODO decide whether you want to use the generateSubpopulationUsingProbability method here
        subpopulation.markCompleted();
      } else{
        subpopulation = this.generateSubpopulation(alleleFrequencies, alleleNames, fragPopSize); //TODO decide whether you want to use the generateSubpopulationUsingProbability method here
        subpopulation.markCompleted();
      }
      metaPopulation.addSubpopulation(subpopulation);
    }
    metaPopulation.completeMetapopulation();
    this.currentMetapopulationSource.next(metaPopulation);
    //being added to the generation tracker happens elsewhere (TODO should it??)
  }

  generateSubpopulationUsingProbability(alleleFrequencies: Array<number>, alleleNames: Array<string>, subpopSize: number){
    let subPopulation = new Population([]);
    while(subPopulation.getIndividuals().length<subpopSize){
      let newIndividual = this.generateRandomIndividualGivenPopAlleleFrequencies(alleleFrequencies, alleleNames);
      subPopulation.addIndividual(newIndividual);
    }
    return subPopulation;
  }

  generateSubpopulation(alleleFrequencies: Array<number>, alleleNames: Array<string>, subpopSize: number){
  //TODO figure out why this is biasing towards the first nonzero allele
  let subPopulation = new Population([]);
  let alleleNameCombos = this.allGenotypes(alleleNames, 2);
  let allelicCombos = this.allGenotypes(alleleFrequencies, 2);
  for(let j = 0; j < alleleNameCombos.length; j++){
    if(allelicCombos[j][0] === allelicCombos[j][1]){
      let homozygoteCount = allelicCombos[j][0] * allelicCombos[j][1] * subpopSize;
      for(let k = 0; k < homozygoteCount; k++){
        let individual = this.individualGenerator.makeIndividual(alleleNameCombos[j][0], alleleNameCombos[j][1]);
        subPopulation.addIndividual(individual);
      }
    } else {
      let heterozygoteCount = 2 * allelicCombos[j][0] * allelicCombos[j][1] * subpopSize;
      for (let l = 0; l<heterozygoteCount; l++){
        let individual = this.individualGenerator.makeIndividual(alleleNameCombos[j][0], alleleNameCombos[j][1]);
        subPopulation.addIndividual(individual);
      }
    }
  }
  while(subPopulation.getIndividuals().length>subpopSize){
    subPopulation = this.removeAnIndividualAtRandomFromGivenPopulation(subPopulation);
  }
  while(subPopulation.getIndividuals().length<subpopSize){
    let newIndividual = this.generateRandomIndividualGivenPopAlleleFrequencies(alleleFrequencies, alleleNames);
    subPopulation.addIndividual(newIndividual);
  }
  return subPopulation;
}

  clearPopulation(){
    let emptyPopulation = new Population([]);
    let emptyGenerations = new Array<Population>();
    this.currentPopulationSource.next(emptyPopulation);
    this.generationsSouce.next(emptyGenerations);
  }

  clearMetaPopulation(){
    let emptyMetapopulation = new Metapopulation([], 0);
    let emptyMetapopulationGenerations = new Array<Metapopulation>();
    this.currentMetapopulationSource.next(emptyMetapopulation);
    this.metapopulationGenerationsSouce.next(emptyMetapopulationGenerations);
  }

  clearMetaPopulationOfMatedPairs(){
    let emptyMetapopulation = new MetapopulationOfMatedPairs([]);
    this.currentMetapopulationOfMatedPairsSource.next(emptyMetapopulation);
  }

  addToGenerations(population: Population){
    this.generationsSouce.pipe(take(1)).subscribe((populations: Array<Population>)=>{
      populations.push(population);
      this.generationsSouce.next(populations);
    });
  }

  addToMetapopulationGenerations(metapopulation: Metapopulation){
    this.metapopulationGenerationsSouce.pipe(take(1)).subscribe((metapopulations: Array<Metapopulation>)=>{
      metapopulations.push(metapopulation);
      this.metapopulationGenerationsSouce.next(metapopulations);
    });
  }

  getScrambledSubPopulation(subpopNumber: number){
    return Observable.create(obs => {
      this.currentMetaPopulation.pipe(take(1)).subscribe((metapopulation: Metapopulation)=>{
        let individuals = metapopulation.getSubpopulation(subpopNumber).getIndividuals();
        let shuffledIndividuals = this.shuffle(individuals);
        obs.next(shuffledIndividuals);
      });
    });
  }

getRandom(small, large){
  return (Math.floor(Math.random() * (large-small+1)) + small);
}

shuffle(array) { //TODO could have a smaller big O; won't scale well with large arrays
  let returnArray = [];
  let indexTracker = [];
  var currentIndex = array.length-1, temporaryValue, randomIndex;
  while (currentIndex >= 0) {
    randomIndex = this.getRandom(0, currentIndex);
    while(indexTracker.indexOf(randomIndex) > -1){
      randomIndex = this.getRandom(0, array.length-1);
    }
    currentIndex -= 1;
    indexTracker.push(randomIndex);
    returnArray.push(array[randomIndex]);
  }
  return returnArray;
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
      // console.log("your population is too small!");
      this.addRandomIndividualGivenPopAlleleFrequencies([alleleFrequencyBlue, alleleFrequencyGreen, alleleFrequencyMagenta], ["blue", "green", "magenta"]);
    }
    if(population.getIndividuals().length>popSize){
      // console.log("your population is too big! Weird!")
      this.removeAnIndividualAtRandomFromPopulation();
    }
  });
  //can't do a while loop instead of an if statement above, because I don't think the addRandomIndividualGivenPopAlleleFrequencies emits in time to ever be falsified by the while statement?
  this.currentPopulationSource.pipe(take(1)).subscribe((population: Population)=>{
  // console.log(population);
  if(population.getIndividuals().length<popSize){
    // console.log("your population is too small!");
    this.addRandomIndividualGivenPopAlleleFrequencies([alleleFrequencyBlue, alleleFrequencyGreen, alleleFrequencyMagenta], ["blue", "green", "magenta"]);
  }
  if(population.getIndividuals().length>popSize){
    // console.log("your population is too big! Weird!")
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

removeAnIndividualAtRandomFromGivenPopulation(population: Population): Population{
    let randomIndex = Math.floor(Math.random()*population.getIndividuals().length) + 1;
    let newIndividualArray: Array<Organism> = population.getIndividuals();
    newIndividualArray.splice(randomIndex,1);
    let newPopulation: Population = new Population(newIndividualArray);
    return newPopulation;
}

generateRandomIndividualGivenPopAlleleFrequencies(alleleFrequencies: Array<number>, alleleNames: Array<string>){
  //TODO I am not 100% convinced that this works as expected
  let randomNumberBetween0And1 = Math.random();
  let cumulativeProbability = 0;
  let allele1 = "errorInAddRandomIndividualGivenPopAlleleFrequencies";
  let allele2 = "errorInAddRandomIndividualGivenPopAlleleFrequencies";
  for(let i = 0; i<alleleFrequencies.length; i++){
    if(randomNumberBetween0And1 >= cumulativeProbability && randomNumberBetween0And1 <= cumulativeProbability+alleleFrequencies[i]){
    //if the random number falls in this probability space
    allele1 = alleleNames[i];
  }
  cumulativeProbability = cumulativeProbability + alleleFrequencies[i];
}
randomNumberBetween0And1 = Math.random();
cumulativeProbability = 0;
for(let i = 0; i<alleleFrequencies.length; i++){
  if(randomNumberBetween0And1 >= cumulativeProbability && randomNumberBetween0And1 <= cumulativeProbability+alleleFrequencies[i]){
  //if the random number falls in this probability space
  allele2 = alleleNames[i];
  cumulativeProbability += alleleFrequencies[i];
}
cumulativeProbability = cumulativeProbability + alleleFrequencies[i];
}
let newIndividual: Organism = this.individualGenerator.makeIndividual(allele1, allele2);
return newIndividual;
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

calculatePopulationAlleleFrequency(alleleName: string, populationOfInterest: Population): number{
  let alleleOfInterestCount = 0;
  let individuals = populationOfInterest.getIndividuals();
  let popSize = individuals.length;
  // console.log(popSize);
  individuals.forEach(individual =>{
    let allele1 = individual.getGeneByName("spot color").getGenotype().getAllele1();
    let allele2 = individual.getGeneByName("spot color").getGenotype().getAllele2();
    if (allele1 === alleleName){alleleOfInterestCount++;}
    if (allele2 === alleleName){alleleOfInterestCount++;}
  });
  return(alleleOfInterestCount/(2*popSize));
}

calculateAlleleFrequencyOfSource(alleleName: string, doYouWantNewGeneration: boolean){ //TODO accommodate different behaviorSubjects!
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

pickTwoToMate(subpopNum: number){
  // console.log("got to pickTwoToMate");
  // console.log(subpopNum);
  let matedCount = 0;
  let bachelorNumberOne: Organism;
  let bachelorNumberTwo: Organism;
  this.getScrambledSubPopulation(subpopNum).pipe(take(1)).subscribe(scrambledIndividuals =>{
    let eligibleBachelorCount = 0;
    for(let i = 0; i<scrambledIndividuals.length; i++){
      if(!scrambledIndividuals[i].isMated()){
        eligibleBachelorCount ++;
      }
    }
    if(eligibleBachelorCount <2){
      this.eligibleBachelorsAbsentSource.next(true);
      alert("There aren't enough eligible individuals to continue the pairing process");
      //TODO have this disable the button somehow or disable the button before this happens
      return;
    }
    for(let i = 0; i<scrambledIndividuals.length; i++){ //TODO should be able to make more efficient
      if(matedCount < 2){
        if(!scrambledIndividuals[i].isMated() && matedCount == 0){ // && !scrambledIndividuals[i+1].isMated()
          scrambledIndividuals[i].designateAsMated();
          bachelorNumberOne = scrambledIndividuals[i]
          matedCount ++;
        } else{
          if(!scrambledIndividuals[i].isMated() && matedCount == 1){
            scrambledIndividuals[i].designateAsMated();
            bachelorNumberTwo = scrambledIndividuals[i]
            matedCount ++;
          }
        }
      }
    }
    bachelorNumberOne.designateMate(bachelorNumberTwo);
    bachelorNumberTwo.designateMate(bachelorNumberOne);
    this.updateSubpopulationInMetapopulation(subpopNum, scrambledIndividuals);
    let newlyWeds = new MatedPair(bachelorNumberOne, bachelorNumberTwo);
    this.addMatedPairToSubpop(subpopNum, newlyWeds);
  });
}

updateSubpopulationInMetapopulation(subpopNum: number, arrayOfIndividuals: Array<Organism>){
  this.currentMetapopulationSource.pipe(take(1)).subscribe(metapopulation =>{
    let updatedMetapopulation = metapopulation;
    let newPop = new Population(arrayOfIndividuals);
    newPop.markCompleted();
    updatedMetapopulation.updateSubpopulation(subpopNum, newPop);
    this.currentMetapopulationSource.next(updatedMetapopulation);
  });
}

getMostRecentMatedPair(subpopNum: number){
  return Observable.create(obs => {
    this.currentMetapopulationOfMatedPairsSource.pipe(take(1)).subscribe((metapopulationOfMatedPairs: MetapopulationOfMatedPairs) =>{
      let targetSubpop = metapopulationOfMatedPairs.getSubpopulation(subpopNum).getMatedPairs();
      obs.next(targetSubpop[targetSubpop.length-1]);
    });
  });
}

addMatedPairToSubpop(subpopNum: number, matedPair: MatedPair){
  this.currentMetapopulationOfMatedPairsSource.pipe(take(1)).subscribe((metapopulationOfMatedPairs: MetapopulationOfMatedPairs) =>{
    let modifiedMetapopOfMPs = this.modifyMetapopulationOfMatedPairsToContainCorrectNumberOfEmptySubpopulationsOfMatedPairsNecessary(metapopulationOfMatedPairs,subpopNum);
  });
  this.currentMetapopulationOfMatedPairsSource.pipe(take(1)).subscribe((metapopulationOfMatedPairs: MetapopulationOfMatedPairs) =>{
    if(metapopulationOfMatedPairs.getSubpopulation(subpopNum)){
      let subpop = metapopulationOfMatedPairs.getSubpopulation(subpopNum);
      subpop.addMatedPair(matedPair);
      this.currentMetapopulationOfMatedPairsSource.next(metapopulationOfMatedPairs);
      //TODO .next
    } else{
      alert("Yikes! Something has gone wrong!");
  }
  });
}

modifyMetapopulationOfMatedPairsToContainCorrectNumberOfEmptySubpopulationsOfMatedPairsNecessary(metapopulationOfMatedPairs: MetapopulationOfMatedPairs, subpopNum: number){
  let currentSubpopMaxIndex = metapopulationOfMatedPairs.getSubpopulations().length -1;
  if(currentSubpopMaxIndex < subpopNum){
    for (let i = currentSubpopMaxIndex; i < subpopNum; i++){
      let newSubpopOfMatedPairs = new PopulationOfMatedPairs([]);
      metapopulationOfMatedPairs.addSubpopulation(newSubpopOfMatedPairs);
    }
  } else{
    //Do nothing
  }
    return metapopulationOfMatedPairs;
}

addOffspringToNewGeneration(subpopNum: number, offspring: Organism){
  //TODO work on this
  // this.nextGenMetapopulation.pipe(take(1)).subscribe((metapopulation: Metapopulation)=>{
  //   metapopulation
  // });
  // this.addOffspringToSubpop()
  // nextGenMetapopulationSource
}

addOffspringToSubpop(subpopNum: number, offspring: Organism){
  this.nextGenMetapopulation.pipe(take(1)).subscribe((metapopulation: Metapopulation)=>{
    let subPops = metapopulation.getSubpopulations();
    if(subPops.length -1 < subpopNum){
      for(let i = subPops.length -1; i<subpopNum; i++){
        if(i == subpopNum-1){
          subPops.push(new Population(new Array<Organism>(offspring)));
        } else{
          subPops.push(new Population(new Array<Organism>()));
        }
      }
    } else{
      subPops[subpopNum].addIndividual(offspring);
    }
    //either way, emit new next gen? TODO
    this.metapopulationGenerations.pipe(take(1)).subscribe((metapopulations: Metapopulation[])=>{
      this.nextGenMetapopulationSource.next(new Metapopulation(subPops, metapopulations.length));
    });
  });
}

resetQuestions(){
  //TODO
}

}
