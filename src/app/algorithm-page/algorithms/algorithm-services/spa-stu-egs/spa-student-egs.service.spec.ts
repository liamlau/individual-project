import { TestBed } from '@angular/core/testing';

import { SpaStudentEgsService } from './spa-student-egs.service';

describe('SpaStudentEgsService', () => {
  let service: SpaStudentEgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaStudentEgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
