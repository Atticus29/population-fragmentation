import { TestBed, inject } from '@angular/core/testing';

import { ColorNameService } from './color-name.service';

describe('ColorNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorNameService]
    });
  });

  it('should be created', inject([ColorNameService], (service: ColorNameService) => {
    expect(service).toBeTruthy();
  }));
});
