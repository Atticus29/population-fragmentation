import { TestBed, inject } from '@angular/core/testing';
import { Gene } from './gene.model';
import { Genotype } from './genotype.model';
import { Organism } from './organism.model';

import { IndividualGenerationService } from './individual-generation.service';

describe('IndividualGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividualGenerationService]
    });
  });

  it('should be created', inject([IndividualGenerationService], (service: IndividualGenerationService) => {
    expect(service).toBeTruthy();
  }));

  it('should allow you to get a gene by name', ()=>{
    let genotype1: Genotype = new Genotype("a1", "a2");
    let gene1: Gene = new Gene ("spot color", genotype1);
    let genes: Array<Gene> = new Array<Gene>(gene1);
    let organism1: Organism = new Organism("pickles", genes);
    let fetchedGene: Gene = organism1.getGeneByName("spot color");
    expect(fetchedGene.getGeneName()).toEqual("spot color");
  });
});
