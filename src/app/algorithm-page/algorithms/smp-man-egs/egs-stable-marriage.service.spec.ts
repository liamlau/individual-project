import { TestBed } from '@angular/core/testing';

import { EgsStableMarriageService } from './egs-stable-marriage.service';

describe('EgsStableMarriageService', () => {
  let service: EgsStableMarriageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgsStableMarriageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
