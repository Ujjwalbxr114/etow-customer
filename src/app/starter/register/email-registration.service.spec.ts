import { TestBed } from '@angular/core/testing';

import { EmailRegistrationService } from './email-registration.service';

describe('EmailRegistrationService', () => {
  let service: EmailRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
