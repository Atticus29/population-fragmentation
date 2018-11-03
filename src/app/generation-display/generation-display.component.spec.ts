import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationDisplayComponent } from './generation-display.component';

describe('GenerationDisplayComponent', () => {
  let component: GenerationDisplayComponent;
  let fixture: ComponentFixture<GenerationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
