import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlgorithmGuard } from './algorithm-guard';

describe('AlgorithmGuardGuard', () => {
  let guard: AlgorithmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule],});
    guard = TestBed.inject(AlgorithmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
