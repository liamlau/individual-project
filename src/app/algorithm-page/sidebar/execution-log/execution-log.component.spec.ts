import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaybackService } from '../../services/playback/playback.service';

import { ExecutionLogComponent } from './execution-log.component';

describe('ExecutionLogComponent', () => {
  let component: ExecutionLogComponent;
  let fixture: ComponentFixture<ExecutionLogComponent>;
  let playback: PlaybackService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionLogComponent ],
      providers: [ PlaybackService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionLogComponent);
    component = fixture.componentInstance;
    playback = TestBed.inject(PlaybackService);
    playback.algorithmData["description"] = ["a", "b", "c"];
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
