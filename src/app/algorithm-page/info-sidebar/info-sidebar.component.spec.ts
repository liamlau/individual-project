import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSidebarComponent } from './info-sidebar.component';

describe('InfoSidebarComponent', () => {
  let component: InfoSidebarComponent;
  let fixture: ComponentFixture<InfoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
