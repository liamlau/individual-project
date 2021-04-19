import { TestBed } from '@angular/core/testing';

import { EgsResidentHSService } from './hr-resident-egs.service';

describe('EgsResidentHSService', () => {
  let service: EgsResidentHSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgsResidentHSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test correctness x10000 (hr-resident-egs)', () => {
    let stable: boolean = true;
    for (let i = 0; i < 10000; i++) {
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
