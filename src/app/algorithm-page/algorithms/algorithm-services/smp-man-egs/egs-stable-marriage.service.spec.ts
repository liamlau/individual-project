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

  it('test correctness x10000 (smp-man-egs)', () => {
    let stable: boolean = true;
    for (let i = 0; i < 10000; i++) {
      let agentCount: number = Math.floor(Math.random() * (9 - 2) + 2);
      service.run(agentCount, agentCount, undefined);
      if (!service.stable) {
        stable = false;
      }
    }
    
    expect(stable).toBeTrue();
  });

});
