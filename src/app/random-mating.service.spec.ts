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

  it('should roll a random number between 1 and N', inject([RandomMatingService], (service: RandomMatingService) => {
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
    expect(service.rollNSideDie(5)).not.toBeGreaterThan(5);
  }));
});
