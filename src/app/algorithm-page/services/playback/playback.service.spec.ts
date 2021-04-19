import { TestBed } from '@angular/core/testing';

import { PlaybackService } from './playback.service';

describe('PlaybackService', () => {
  let service: PlaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaybackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
