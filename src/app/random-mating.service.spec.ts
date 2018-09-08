import { TestBed, inject } from '@angular/core/testing';

import { RandomMatingService } from './random-mating.service';

describe('RandomMatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomMatingService]
    });
  });

  it('should be created', inject([RandomMatingService], (service: RandomMatingService) => {
    expect(service).toBeTruthy();
  }));
});
