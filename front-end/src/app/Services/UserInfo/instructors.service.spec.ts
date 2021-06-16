import { TestBed } from '@angular/core/testing';

import { InstructorsService } from './instructors.service';

describe('InstructorsService', () => {
  let service: InstructorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
