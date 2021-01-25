import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabContentComponent } from './home-tab-content.component';

describe('HomeTabContentComponent', () => {
  let component: HomeTabContentComponent;
  let fixture: ComponentFixture<HomeTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
