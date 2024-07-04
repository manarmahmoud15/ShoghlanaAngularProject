import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { freelancerGuard } from './freelancer.guard';

describe('freelancerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => freelancerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
