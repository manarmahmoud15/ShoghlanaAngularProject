import { TestBed } from '@angular/core/testing';

import { IndividualchatService } from './individualchat.service';

describe('IndividualchatService', () => {
  let service: IndividualchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
