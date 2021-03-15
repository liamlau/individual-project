import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBannerComponent } from './feedback-banner.component';

describe('FeedbackBannerComponent', () => {
  let component: FeedbackBannerComponent;
  let fixture: ComponentFixture<FeedbackBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
