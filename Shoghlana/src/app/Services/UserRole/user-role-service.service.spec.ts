import { TestBed } from '@angular/core/testing';

import { UserRoleServiceService } from './user-role-service.service';

describe('UserRoleServiceService', () => {
  let service: UserRoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
