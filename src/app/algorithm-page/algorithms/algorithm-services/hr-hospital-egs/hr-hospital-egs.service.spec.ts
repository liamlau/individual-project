import { TestBed } from '@angular/core/testing';

import { HrHospitalEgsService } from './hr-hospital-egs.service';

describe('HrHospitalRgsService', () => {
  let service: HrHospitalEgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrHospitalEgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
