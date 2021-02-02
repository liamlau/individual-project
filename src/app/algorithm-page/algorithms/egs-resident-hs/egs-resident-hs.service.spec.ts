import { TestBed } from '@angular/core/testing';

import { EgsResidentHSService } from './egs-resident-hs.service';

describe('EgsResidentHSService', () => {
  let service: EgsResidentHSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgsResidentHSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
