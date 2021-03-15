import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationGuideDialogComponent } from './animation-guide-dialog.component';

describe('AnimationGuideDialogComponent', () => {
  let component: AnimationGuideDialogComponent;
  let fixture: ComponentFixture<AnimationGuideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationGuideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationGuideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
