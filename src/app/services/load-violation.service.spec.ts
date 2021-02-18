import { TestBed } from '@angular/core/testing';

import { LoadViolationService } from './load-violation.service';

describe('LoadViolationService', () => {
  let service: LoadViolationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadViolationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
