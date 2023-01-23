import { TestBed } from '@angular/core/testing';

import { StableRoomIrvService } from './stable-room-irv.service';

describe('StableRoomIrvService', () => {
  let service: StableRoomIrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StableRoomIrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // added test from smp
  // it("test correctness x 10 (smp-room-irv)", () => {
  //   let stable: boolean = true;
  //   for (let i = 0; i < 10; i++) {
  //     let agentCount: number = Math.floor(Math.random() * (9 - 2) + 2);
  //     service.run(agentCount, agentCount, undefined);
  //     if (!service.stable) {
  //       stable = false;
  //     }
  //   }

  //   expect(stable).toBeTrue();
  // })

});
