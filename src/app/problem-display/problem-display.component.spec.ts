import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDisplayComponent } from './problem-display.component';

describe('ProblemDisplayComponent', () => {
  let component: ProblemDisplayComponent;
  let fixture: ComponentFixture<ProblemDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
