import { TestBed } from '@angular/core/testing';

import { ExecutionService } from './execution.service';

describe('ExecutionService', () => {
  let service: ExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
