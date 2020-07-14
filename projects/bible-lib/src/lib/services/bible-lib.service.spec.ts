import { TestBed } from '@angular/core/testing';

import { BibleLibService } from './bible-lib.service';

describe('BibleLibService', () => {
  let service: BibleLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
