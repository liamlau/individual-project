import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudocodeComponent } from './pseudocode.component';

describe('PseudocodeComponent', () => {
  let component: PseudocodeComponent;
  let fixture: ComponentFixture<PseudocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PseudocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PseudocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
