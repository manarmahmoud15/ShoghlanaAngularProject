import { TestBed } from '@angular/core/testing';

import { ApiAddProjectService } from './api-add-project.service';

describe('ApiAddProjectService', () => {
  let service: ApiAddProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAddProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
