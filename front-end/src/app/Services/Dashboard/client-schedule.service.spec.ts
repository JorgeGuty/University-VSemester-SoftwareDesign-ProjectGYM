import { TestBed } from '@angular/core/testing';

import { ClientScheduleService } from './client-schedule.service';

describe('ClientScheduleService', () => {
  let service: ClientScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
