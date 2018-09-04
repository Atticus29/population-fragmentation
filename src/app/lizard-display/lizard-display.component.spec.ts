import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LizardDisplayComponent } from './lizard-display.component';

describe('LizardDisplayComponent', () => {
  let component: LizardDisplayComponent;
  let fixture: ComponentFixture<LizardDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LizardDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LizardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
