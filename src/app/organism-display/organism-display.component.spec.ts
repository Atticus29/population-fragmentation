import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
