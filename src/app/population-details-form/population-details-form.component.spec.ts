import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationDetailsFormComponent } from './population-details-form.component';

describe('PopulationDetailsFormComponent', () => {
  let component: PopulationDetailsFormComponent;
  let fixture: ComponentFixture<PopulationDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
