import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeTabContentComponent } from './about-me-tab-content.component';

describe('AboutMeTabContentComponent', () => {
  let component: AboutMeTabContentComponent;
  let fixture: ComponentFixture<AboutMeTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
