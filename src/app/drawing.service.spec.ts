import { TestBed, inject } from '@angular/core/testing';

import { DrawingService } from './drawing.service';

describe('DrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawingService]
    });
  });

  it('should be created', inject([DrawingService], (service: DrawingService) => {
    expect(service).toBeTruthy();
  }));
});
