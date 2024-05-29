import { TestBed } from '@angular/core/testing';

import { StaticClientJobsService } from './static-client-jobs.service';

describe('StaticClientJobsService', () => {
  let service: StaticClientJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticClientJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
