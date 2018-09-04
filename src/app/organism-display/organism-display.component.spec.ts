import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Gene } from '../gene.model';
import { Genotype } from '../genotype.model';

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
    expect(genotype1.getGenotype()).toEqual(testArray);
  });

  it('should instantiate a gene', () => {
    expect(component).toBeTruthy();
  });
});
