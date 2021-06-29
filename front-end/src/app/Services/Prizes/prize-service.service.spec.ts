import { TestBed } from '@angular/core/testing';

import { PrizeServiceService } from './prize-service.service';

describe('PrizeServiceService', () => {
  let service: PrizeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrizeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
