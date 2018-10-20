declare var require: any
import { Injectable } from '@angular/core';
import { Genotype } from './genotype.model';
import { Gene } from './gene.model';
import { Organism } from './organism.model';

@Injectable({
  providedIn: 'root'
})
export class IndividualGenerationService {
  private petNames = require('pet-names');
  constructor() { }

  makeIndividual(allele1: string, allele2: string): Organism{
    let genotype: Genotype = new Genotype(allele1, allele2);
    let gene: Gene = new Gene("spot color", genotype);
    let genes: Array<Gene> = new Array<Gene>(gene);
    let organism: Organism = new Organism(this.petNames.random(), genes);
    return organism;
  }

  makeOffspring(individual1: Organism, individual2: Organism): Organism{
    let individual1Alleles= individual1.getGeneByName("spot color").getGenotype().getGenotypeArray();
    let randomAlleleIndividual1Index = Math.random()<0.5 ? 0 : 1;

    let individual2Alleles= individual2.getGeneByName("spot color").getGenotype().getGenotypeArray();
    let randomAlleleIndividual2Index = Math.random()<0.5 ? 0 : 1;
    // console.log(randomAllele);

    let genotype: Genotype = new Genotype(individual1Alleles[randomAlleleIndividual1Index], individual2Alleles[randomAlleleIndividual2Index]);
    let gene: Gene = new Gene("spot color", genotype);
    let genes: Array<Gene> = new Array<Gene>(gene);
    let organism: Organism = new Organism(this.petNames.random(), genes);
    return organism;
  }
}
