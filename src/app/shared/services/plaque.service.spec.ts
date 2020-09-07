import { TestBed } from '@angular/core/testing';

import { PlaqueService } from './plaque.service';

describe('PlaqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaqueService = TestBed.get(PlaqueService);
    expect(service).toBeTruthy();
  });
});
