import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmpManEgsCodeComponent } from './smp-man-egs-code.component';

describe('SmpManEgsCodeComponent', () => {
  let component: SmpManEgsCodeComponent;
  let fixture: ComponentFixture<SmpManEgsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmpManEgsCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmpManEgsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
