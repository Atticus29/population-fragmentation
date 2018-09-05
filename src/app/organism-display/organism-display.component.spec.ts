import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Gene } from '../gene.model';
import { Genotype } from '../genotype.model';
import { Organism } from '../organism.model';

import { OrganismDisplayComponent } from './organism-display.component';

describe('OrganismDisplayComponent', () => {
  let component: OrganismDisplayComponent;
  let fixture: ComponentFixture<OrganismDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate a genotype', () => {
    let genotype1: Genotype = new Genotype("a1", "a1");
    let testArray = new Array<string>();
    testArray.push("a1");
    testArray.push("a1");
    expect(genotype1.getGenotypeArray()).toEqual(testArray);
  });

  it('should instantiate a gene', () => {
    let genotype1: Genotype = new Genotype("a1", "a2");
    let testArray = new Array<string>();
    testArray.push("a1");
    testArray.push("a2");
    let gene1: Gene = new Gene ("spot color", genotype1);
    expect(gene1.getGenotype().getGenotypeArray()).toEqual(testArray);
    expect(gene1.getGeneName()).toEqual("spot color");
  });

  it('should instantiate an organism', () => {
    let genotype1: Genotype = new Genotype("a1", "a2");
    let gene1: Gene = new Gene ("spot color", genotype1);
    let genes: Array<Gene> = new Array<Gene>(gene1);
    let organism1: Organism = new Organism("pickles", genes);
    expect(organism1.getOrganismName()).toEqual("pickles");
  });
});
