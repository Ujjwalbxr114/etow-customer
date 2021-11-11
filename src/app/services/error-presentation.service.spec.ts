import { TestBed } from '@angular/core/testing';

import { ErrorPresentationService } from './error-presentation.service';

describe('ErrorPresentationService', () => {
  let service: ErrorPresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorPresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
