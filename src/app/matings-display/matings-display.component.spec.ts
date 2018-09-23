import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatingsDisplayComponent } from './matings-display.component';

describe('MatingsDisplayComponent', () => {
  let component: MatingsDisplayComponent;
  let fixture: ComponentFixture<MatingsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatingsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
