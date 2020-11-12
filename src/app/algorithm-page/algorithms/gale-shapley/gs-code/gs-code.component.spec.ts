import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsCodeComponent } from './gs-code.component';

describe('GsCodeComponent', () => {
  let component: GsCodeComponent;
  let fixture: ComponentFixture<GsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
