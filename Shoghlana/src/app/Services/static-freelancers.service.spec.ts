import { TestBed } from '@angular/core/testing';

import { StaticFreelancersService } from './static-freelancers.service';

describe('StaticFreelancersService', () => {
  let service: StaticFreelancersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticFreelancersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
