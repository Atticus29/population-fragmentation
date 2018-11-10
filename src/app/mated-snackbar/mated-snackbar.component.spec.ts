import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatedSnackbarComponent } from './mated-snackbar.component';

describe('MatedSnackbarComponent', () => {
  let component: MatedSnackbarComponent;
  let fixture: ComponentFixture<MatedSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatedSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
