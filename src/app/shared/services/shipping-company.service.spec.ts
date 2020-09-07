import { TestBed } from '@angular/core/testing';

import { ShippingCompanyService } from './shipping-company.service';

describe('ShippingCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShippingCompanyService = TestBed.get(ShippingCompanyService);
    expect(service).toBeTruthy();
  });
});