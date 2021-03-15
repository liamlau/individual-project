import { TestBed } from '@angular/core/testing';

import { GsStableMarriageService } from './gs-stable-marriage.service';

describe('GsStableMarriageService', () => {
  let service: GsStableMarriageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsStableMarriageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
