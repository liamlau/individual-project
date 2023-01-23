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

  // added test from HR/R 
  it('test correctness x10 (hr-hospital-egs)', () => {
    let stable: boolean = true;
    for (let i = 0; i < 10; i++) {
      let agent1Count: number = Math.floor(Math.random() * (9 - 2) + 2);
      let agent2Count: number = Math.floor(Math.random() * (9 - 2) + 2);
      service.run(agent1Count, agent2Count, undefined);
      if (!service.stable) {
        stable = false;
      }
    }
    
    expect(stable).toBeTrue();
  });
});
