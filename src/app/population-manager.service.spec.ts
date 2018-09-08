import { TestBed, inject } from '@angular/core/testing';

import { PopulationManagerService } from './population-manager.service';

describe('PopulationManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulationManagerService]
    });
  });

  it('should be created', inject([PopulationManagerService], (service: PopulationManagerService) => {
    expect(service).toBeTruthy();
  }));
});
