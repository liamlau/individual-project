import { TestBed } from '@angular/core/testing';

import { AlgorithmGuard } from './algorithm-guard';

describe('AlgorithmGuardGuard', () => {
  let guard: AlgorithmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlgorithmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
