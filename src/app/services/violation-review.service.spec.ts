import { TestBed } from '@angular/core/testing';

import { ViolationReviewService } from './violation-review.service';

describe('ViolationReviewService', () => {
  let service: ViolationReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViolationReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
