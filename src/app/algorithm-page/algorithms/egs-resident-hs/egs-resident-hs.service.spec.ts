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

  it('test correctness (hr-resident-egs)', () => {
    let algData = service.run(5, 5, undefined);
    console.log(algData);
    expect(algData).toBeDefined();
  });

});
