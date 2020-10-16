import { TestBed } from '@angular/core/testing';

import { GaleShapleyService } from './gale-shapley.service';

describe('GaleShapleyService', () => {
  let service: GaleShapleyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleShapleyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
