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
}
