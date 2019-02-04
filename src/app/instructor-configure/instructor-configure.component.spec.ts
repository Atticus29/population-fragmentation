import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorConfigureComponent } from './instructor-configure.component';

describe('InstructorConfigureComponent', () => {
  let component: InstructorConfigureComponent;
  let fixture: ComponentFixture<InstructorConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
