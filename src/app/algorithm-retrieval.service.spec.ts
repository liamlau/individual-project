import { TestBed } from '@angular/core/testing';

import { AlgorithmRetrievalService } from './algorithm-retrieval.service';

describe('AlgorithmRetrievalService', () => {
  let service: AlgorithmRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
