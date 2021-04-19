import { TestBed } from '@angular/core/testing';

import { AlgorithmAnimationService } from './algorithm-animation.service';

describe('AlgorithmAnimationService', () => {
  let service: AlgorithmAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
