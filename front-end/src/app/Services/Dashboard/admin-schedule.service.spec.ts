import { TestBed } from '@angular/core/testing';

import { AdminScheduleService } from './admin-schedule.service';

describe('AdminScheduleService', () => {
  let service: AdminScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
