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

  it('test correctness (smp-man-gs)', () => {
    let stable: boolean = true;
    for (let i = 0; i < 500; i++) {
      let agentCount: number = Math.floor(Math.random() * (9 - 2) + 2);
      service.run(agentCount, agentCount, undefined);
      if (!service.stable) {
        stable = false;
      }
    }
    
    expect(stable).toBeTrue();
  });

});
