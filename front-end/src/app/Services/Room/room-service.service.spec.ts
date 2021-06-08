import { TestBed } from '@angular/core/testing';

import { RoomServiceService } from './room-service.service';

describe('RoomServiceService', () => {
  let service: RoomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
