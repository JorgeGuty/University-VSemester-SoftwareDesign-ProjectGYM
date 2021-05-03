import { TestBed } from '@angular/core/testing';

import { AdminSessionFormsService } from './admin-session-forms.service';

describe('AdminSessionFormsService', () => {
  let service: AdminSessionFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSessionFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
